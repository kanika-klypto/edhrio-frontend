import { useState, useEffect, useRef, useCallback } from 'react';
import { LineSeries } from "lightweight-charts";

const STORAGE_KEY_PREFIX = 'edhrio_drawings_';

export default function useDrawingTools({ chartRef, seriesRef, containerRef, symbol, interval }) {
  const [activeTool, setActiveTool] = useState('cursor'); // 'cursor', 'trendLine', 'horizontalLine'
  
  // State for the floating toolbox
  const [selectedLine, setSelectedLine] = useState(null); // { id, price, color, width, style }
  const [toolboxPos, setToolboxPos] = useState(null); // { x, y }

  const drawingsRef = useRef({
    horizontalLines: [], // array of { id, price, color, width, style }
    trendLines: []
  });
  
  const renderedItemsRef = useRef({
    horizontalLines: [], // array of { id, priceLineObj }
    trendLines: []
  });

  const drawingStateRef = useRef({
    isDrawing: false,
    startPoint: null,
    tempSeries: null
  });

  const getStorageKey = useCallback(() => {
    return `${STORAGE_KEY_PREFIX}${symbol}_${interval}`;
  }, [symbol, interval]);

  const saveDrawings = useCallback(() => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(drawingsRef.current));
    } catch (e) {
      console.error('Failed to save drawings to localStorage', e);
    }
  }, [getStorageKey]);

  const loadDrawings = useCallback(() => {
    try {
      const stored = localStorage.getItem(getStorageKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migrate old horizontal lines (which were just numbers) to objects
        if (parsed.horizontalLines && parsed.horizontalLines.length > 0) {
          parsed.horizontalLines = parsed.horizontalLines.map(hl => {
            if (typeof hl === 'number') {
              return { id: Math.random().toString(36).substr(2, 9), price: hl, color: '#2962FF', width: 2, style: 0 };
            }
            return hl;
          });
        }
        if (parsed.trendLines && parsed.trendLines.length > 0) {
          parsed.trendLines = parsed.trendLines.map(tl => {
            if (Array.isArray(tl)) {
              return { id: Math.random().toString(36).substr(2, 9), points: tl, color: '#2962FF', width: 2, style: 0 };
            }
            return tl;
          });
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load drawings from localStorage', e);
    }
    return { horizontalLines: [], trendLines: [] };
  }, [getStorageKey]);

  const clearRenderedItems = useCallback(() => {
    if (!chartRef.current || !seriesRef.current) return;

    renderedItemsRef.current.horizontalLines.forEach(item => {
      try {
        seriesRef.current.removePriceLine(item.priceLineObj);
      } catch (e) { /* ignore */ }
    });
    renderedItemsRef.current.horizontalLines = [];

    renderedItemsRef.current.trendLines = [];
  }, [chartRef, seriesRef]);

  const renderDrawings = useCallback(() => {
    if (!chartRef.current || !seriesRef.current) return;
    
    clearRenderedItems();

    const { horizontalLines, trendLines } = drawingsRef.current;

    horizontalLines.forEach(hl => {
      const priceLineObj = seriesRef.current.createPriceLine({
        price: hl.price,
        color: hl.color || '#2962FF',
        lineWidth: hl.width || 2,
        lineStyle: hl.style !== undefined ? hl.style : 0,
        axisLabelVisible: true,
      });
      renderedItemsRef.current.horizontalLines.push({ id: hl.id, priceLineObj });
    });

    const getTimeValue = (t) => {
      if (!t) return 0;
      if (typeof t === 'number') return t;
      if (typeof t === 'string') return new Date(t).getTime();
      if (t.year !== undefined) return new Date(t.year, t.month - 1, t.day).getTime();
      return 0;
    };

    trendLines.forEach(tl => {
      // SVG drawing is handled in updateAnchors
    });
  }, [chartRef, seriesRef, clearRenderedItems]);

  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;
    
    drawingsRef.current = loadDrawings();
    renderDrawings();
  }, [symbol, interval, loadDrawings, renderDrawings]);

  const clearAllDrawings = useCallback(() => {
    drawingsRef.current = { horizontalLines: [], trendLines: [] };
    saveDrawings();
    renderDrawings();
    setSelectedLine(null);
    setToolboxPos(null);
  }, [saveDrawings, renderDrawings]);

  const updateHorizontalLine = useCallback((id, updates) => {
    const lines = drawingsRef.current.horizontalLines;
    const index = lines.findIndex(l => l.id === id);
    if (index !== -1) {
      lines[index] = { ...lines[index], ...updates };
      saveDrawings();
      renderDrawings();
      setSelectedLine(lines[index]);
    }
  }, [saveDrawings, renderDrawings]);

  const deleteHorizontalLine = useCallback((id) => {
    drawingsRef.current.horizontalLines = drawingsRef.current.horizontalLines.filter(l => l.id !== id);
    saveDrawings();
    renderDrawings();
    setSelectedLine(null);
    setToolboxPos(null);
  }, [saveDrawings, renderDrawings]);

  const updateTrendLine = useCallback((id, updates) => {
    const lines = drawingsRef.current.trendLines;
    const index = lines.findIndex(l => l.id === id);
    if (index !== -1) {
      lines[index] = { ...lines[index], ...updates };
      saveDrawings();
      renderDrawings();
      setSelectedLine(lines[index]);
    }
  }, [saveDrawings, renderDrawings]);

  const deleteTrendLine = useCallback((id) => {
    drawingsRef.current.trendLines = drawingsRef.current.trendLines.filter(l => l.id !== id);
    saveDrawings();
    renderDrawings();
    setSelectedLine(null);
    setToolboxPos(null);
  }, [saveDrawings, renderDrawings]);

  const anchorsRef = useRef({});
  const draggingStateRef = useRef({
    isDragging: false,
    lineId: null
  });

  const isShiftPressedRef = useRef(false);
  const lastMouseParamRef = useRef(null);

  const getSeriesForPane = useCallback((paneIndex) => {
    if (chartRef.current?.panes) {
      const panes = chartRef.current.panes();
      const pane = panes[paneIndex];
      if (pane) {
        const seriesList = pane.getSeries?.();
        if (seriesList && seriesList.length > 0) {
          return seriesList[0];
        }
      }
    }
    return seriesRef.current;
  }, [chartRef, seriesRef]);

  const getPointCoordinate = useCallback((point) => {
    if (!chartRef.current || !point) return null;
    if (point.time != null) {
      const timeCoordinate = chartRef.current.timeScale().timeToCoordinate(point.time);
      if (timeCoordinate !== null) return timeCoordinate;
    }
    if (Number.isFinite(point.logicalIndex)) {
      const logicalCoord = chartRef.current.timeScale().logicalToCoordinate(point.logicalIndex);
      if (logicalCoord !== null) return logicalCoord;
    }
    if (point.rawX != null) return point.rawX;
    return null;
  }, [chartRef]);

  const getPointY = useCallback((point) => {
    if (!point) return null;
    const targetSeries = getSeriesForPane(point.paneIndex ?? 0);
    if (targetSeries && point.value != null) {
      const y = targetSeries.priceToCoordinate(point.value);
      if (y !== null) return y;
    }
    if (seriesRef.current && point.value != null) {
      const y = seriesRef.current.priceToCoordinate(point.value);
      if (y !== null) return y;
    }
    if (point.rawY != null) return point.rawY;
    if (typeof point.value === 'number') return point.value;
    return null;
  }, [getSeriesForPane, seriesRef]);

  // Sync DOM anchors for horizontal lines
  useEffect(() => {
    if (!containerRef || !containerRef.current) return;
    const container = containerRef.current;
    const chart = chartRef.current;

    let anchorsContainer = container.querySelector('.drawing-anchors-container');
    if (!anchorsContainer) {
      anchorsContainer = document.createElement('div');
      anchorsContainer.className = 'drawing-anchors-container';
      anchorsContainer.style.position = 'absolute';
      anchorsContainer.style.top = '0';
      anchorsContainer.style.left = '0';
      anchorsContainer.style.width = '100%';
      anchorsContainer.style.height = '100%';
      anchorsContainer.style.pointerEvents = 'none';
      anchorsContainer.style.zIndex = '40'; // Lower z-index so it doesn't overlap modals
      container.appendChild(anchorsContainer);
    }

    let frameId;
    const updateAnchors = () => {
      if (!seriesRef.current || !chartRef.current) {
        frameId = requestAnimationFrame(updateAnchors);
        return;
      }

      const { horizontalLines, trendLines } = drawingsRef.current;

      let svgContainer = anchorsContainer.querySelector('svg');
      if (!svgContainer) {
         svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
         svgContainer.style.position = 'absolute';
         svgContainer.style.top = '0';
         svgContainer.style.left = '0';
         svgContainer.style.width = '100%';
         svgContainer.style.height = '100%';
         svgContainer.style.pointerEvents = 'none'; // pass clicks through to anchors and chart
         anchorsContainer.insertBefore(svgContainer, anchorsContainer.firstChild);
      }

      // Remove deleted lines
      Object.keys(anchorsRef.current).forEach(key => {
        let exists = false;
        if (key.includes('_')) {
           const id = key.split('_')[0];
           exists = trendLines.some(l => l.id === id);
        } else {
           exists = horizontalLines.some(l => l.id === key);
        }
        if (!exists) {
          anchorsRef.current[key].remove();
          delete anchorsRef.current[key];
        }
      });

      const createAnchor = (id, color, type, dragData) => {
        let anchor = anchorsRef.current[id];
        if (!anchor) {
          anchor = document.createElement('div');
          anchor.className = 'drag-anchor';
          anchor.style.position = 'absolute';
          anchor.style.left = '50%';
          anchor.style.transform = 'translate(-50%, -50%)';
          anchor.style.width = '10px';
          anchor.style.height = '10px';
          anchor.style.backgroundColor = '#020617';
          anchor.style.border = `2px solid ${color}`;
          anchor.style.borderRadius = '2px';
          anchor.style.cursor = 'move';
          anchor.style.pointerEvents = 'auto'; // allow dragging directly

          anchor.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            const latestLines = type === 'horizontalLine' ? drawingsRef.current.horizontalLines : drawingsRef.current.trendLines;
            const currentLine = latestLines.find(l => l.id === dragData.line.id) || dragData.line;
            setSelectedLine(currentLine);
            
            // Calculate a safe toolbox position
            const rect = container.getBoundingClientRect();
            setToolboxPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            
            draggingStateRef.current = { 
               isDragging: true, 
               lineId: dragData.line.id, 
               fromAnchor: true, 
               type: type,
               pointIndex: dragData.pointIndex // only for trendlines
            };
            chart.applyOptions({ handleScroll: false, handleScale: false });
          });

          anchorsContainer.appendChild(anchor);
          anchorsRef.current[id] = anchor;
        }
        anchor.style.border = `2px solid ${color}`;
        return anchor;
      };

      // Update or create horizontal anchors
      horizontalLines.forEach(hl => {
        const anchor = createAnchor(hl.id, hl.color || '#2962FF', 'horizontalLine', { line: hl });
        const y = seriesRef.current.priceToCoordinate(hl.price);
        if (y !== null) {
          anchor.style.top = `${y}px`;
          anchor.style.left = '50%'; // horizontal center
          anchor.style.display = 'block';
        } else {
          anchor.style.display = 'none';
        }
      });

      // Update or create trend line anchors and draw SVG lines
      const existingLines = svgContainer.querySelectorAll('line');
      const currentLineIds = trendLines.map(tl => `svg_line_${tl.id}`);
      if (drawingStateRef.current.isDrawing && drawingStateRef.current.tempParam) currentLineIds.push('svg_line_temp');
      existingLines.forEach(line => {
         if (!currentLineIds.includes(line.id)) line.remove();
      });

      trendLines.forEach(tl => {
        if (tl.points.length !== 2) return;
        const x1 = getPointCoordinate(tl.points[0]);
        const y1 = getPointY(tl.points[0]);
        const x2 = getPointCoordinate(tl.points[1]);
        const y2 = getPointY(tl.points[1]);

        const isSelected = selectedLine && selectedLine.id === tl.id;

        tl.points.forEach((point, index) => {
           const anchorId = `${tl.id}_${index}`;
           const anchor = createAnchor(anchorId, tl.color || '#2962FF', 'trendLineAnchor', { line: tl, pointIndex: index });
           const x = index === 0 ? x1 : x2;
           const y = index === 0 ? y1 : y2;
           if (x !== null && y !== null) {
              anchor.style.left = `${x}px`;
              anchor.style.top = `${y}px`;
              anchor.style.display = isSelected ? 'block' : 'none';
           } else {
              anchor.style.display = 'none';
           }
        });

        // Draw SVG Line
        if (x1 !== null && y1 !== null && x2 !== null && y2 !== null) {
           let line = svgContainer.querySelector(`#svg_line_${tl.id}`);
           if (!line) {
              line = document.createElementNS("http://www.w3.org/2000/svg", "line");
              line.id = `svg_line_${tl.id}`;
              line.style.pointerEvents = 'auto'; // allow clicking the SVG line
              line.addEventListener('mousedown', (e) => {
                 e.stopPropagation();
                 const currentLine = drawingsRef.current.trendLines.find(l => l.id === tl.id) || tl;
                 setSelectedLine(currentLine);
                 const rect = containerRef.current.getBoundingClientRect();
                 setToolboxPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              });
              svgContainer.appendChild(line);
           }
           line.setAttribute('x1', x1);
           line.setAttribute('y1', y1);
           line.setAttribute('x2', x2);
           line.setAttribute('y2', y2);
           line.setAttribute('stroke', tl.color || '#2962FF');
           line.setAttribute('stroke-width', tl.width !== undefined ? tl.width : 2);
           if (tl.style === 1) line.setAttribute('stroke-dasharray', '5,5');
           else if (tl.style === 2) line.setAttribute('stroke-dasharray', '2,2');
           else line.removeAttribute('stroke-dasharray');
           
           line.style.cursor = 'pointer';
        }
      });

      // Draw Temp Line
      if (drawingStateRef.current.isDrawing && drawingStateRef.current.tempParam) {
         const { startPoint, tempParam } = drawingStateRef.current;
         const x1 = getPointCoordinate(startPoint);
         const y1 = getPointY(startPoint);
         const x2 = getPointCoordinate(tempParam);
         const y2 = getPointY(tempParam);
         
         if (x1 !== null && y1 !== null && x2 !== null && y2 !== null) {
            let line = svgContainer.querySelector(`#svg_line_temp`);
            if (!line) {
               line = document.createElementNS("http://www.w3.org/2000/svg", "line");
               line.id = `svg_line_temp`;
               line.style.pointerEvents = 'none';
               svgContainer.appendChild(line);
            }
            line.style.pointerEvents = 'none';
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', '#2962FF');
            line.setAttribute('stroke-width', 2);
         }
      } else {
         const tempLine = svgContainer.querySelector('#svg_line_temp');
         if (tempLine) tempLine.remove();
      }

      frameId = requestAnimationFrame(updateAnchors);
    };

    frameId = requestAnimationFrame(updateAnchors);
    return () => cancelAnimationFrame(frameId);
  }, [containerRef, selectedLine]);

  // Handle global mouse move for drag and double-click logic for chart canvas
  useEffect(() => {
    if (!containerRef || !containerRef.current || !seriesRef.current || !chartRef.current) return;
    const container = containerRef.current;
    const chart = chartRef.current;

    const handleDblClick = (e) => {
      if (activeTool !== 'cursor' || !selectedLine) return;
      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const price = seriesRef.current.coordinateToPrice(y);
      if (price !== null) {
        const threshold = Math.abs((seriesRef.current.coordinateToPrice(y - 10) - seriesRef.current.coordinateToPrice(y + 10)) / 2);
        if (Math.abs(selectedLine.price - price) < threshold) {
          if (!draggingStateRef.current.isDragging) {
            draggingStateRef.current = { isDragging: true, lineId: selectedLine.id };
            chart.applyOptions({ handleScroll: false, handleScale: false });
          } else {
            draggingStateRef.current = { isDragging: false, lineId: null };
            chart.applyOptions({
              handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true },
              handleScale: { mouseWheel: true, pinch: true, axisPressedMouseMove: true, axisDoubleClickReset: true }
            });
          }
        }
      }
    };


    const handleMouseMove = (e) => {
      if (draggingStateRef.current.isDragging && draggingStateRef.current.lineId) {
        const rect = container.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const x = e.clientX - rect.left;
        
        if (draggingStateRef.current.type === 'trendLineAnchor') {
           const tlIndex = drawingsRef.current.trendLines.findIndex(l => l.id === draggingStateRef.current.lineId);
           if (tlIndex !== -1) {
              const tl = drawingsRef.current.trendLines[tlIndex];
              const otherIndex = draggingStateRef.current.pointIndex === 0 ? 1 : 0;
              const otherPoint = tl.points[otherIndex];
              let curX = x;
              let curY = y;

              const isShift = e.shiftKey || isShiftPressedRef.current;
              if (isShift && otherPoint) {
                const ox = getPointCoordinate(otherPoint);
                const oy = getPointY(otherPoint);
                if (ox !== null && oy !== null && (curX !== ox || curY !== oy)) {
                  const dx = curX - ox;
                  const dy = curY - oy;
                  const angle = Math.atan2(dy, dx);
                  const deg = angle * (180 / Math.PI);
                  const snappedDeg = Math.round(deg / 45) * 45;
                  const snappedRad = snappedDeg * (Math.PI / 180);
                  const dist = Math.hypot(dx, dy);
                  curX = ox + dist * Math.cos(snappedRad);
                  curY = oy + dist * Math.sin(snappedRad);
                }
              }

              const time = chartRef.current.timeScale().coordinateToTime(curX) ?? null;
              const logicalIndex = chartRef.current.timeScale().coordinateToLogical(curX) ?? 0;
              const targetSeries = getSeriesForPane(otherPoint?.paneIndex ?? 0);
              let price = targetSeries?.coordinateToPrice(curY);
              if (price === null && seriesRef.current) {
                price = seriesRef.current.coordinateToPrice(curY);
              }
              if (price === null) price = curY;

              tl.points[draggingStateRef.current.pointIndex] = {
                time,
                logicalIndex,
                value: price,
                paneIndex: otherPoint?.paneIndex ?? 0,
                rawY: curY
              };
              saveDrawings();
              renderDrawings();
              setToolboxPos(null);
           }
        } else {
           const price = seriesRef.current.coordinateToPrice(y);
           if (price !== null) {
             updateHorizontalLine(draggingStateRef.current.lineId, { price });
             // Hide toolbox during drag
             setToolboxPos(null);
           }
        }
      }
    };

    const handleGlobalMouseUp = () => {
      // If we are dragging from anchor, stop drag on mouseup
      if (draggingStateRef.current.isDragging && draggingStateRef.current.fromAnchor) {
        draggingStateRef.current = { isDragging: false, lineId: null, fromAnchor: false };
        chart.applyOptions({
          handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true },
          handleScale: { mouseWheel: true, pinch: true, axisPressedMouseMove: true, axisDoubleClickReset: true }
        });
      }
    };

    const handleClick = () => {
      // If we are dragging from dblclick, clicking drops it
      if (draggingStateRef.current.isDragging && !draggingStateRef.current.fromAnchor) {
        draggingStateRef.current = { isDragging: false, lineId: null, fromAnchor: false };
        chart.applyOptions({
          handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: true },
          handleScale: { mouseWheel: true, pinch: true, axisPressedMouseMove: true, axisDoubleClickReset: true }
        });
      }
    };

    container.addEventListener('dblclick', handleDblClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    container.addEventListener('mousedown', handleClick); 

    return () => {
      container.removeEventListener('dblclick', handleDblClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      container.removeEventListener('mousedown', handleClick);
    };
  }, [activeTool, selectedLine, updateHorizontalLine, seriesRef, chartRef, containerRef, getPointCoordinate, getPointY, getSeriesForPane]);

  const onDragLine = useCallback((y) => {
    if (!seriesRef.current || !selectedLine) return;
    const price = seriesRef.current.coordinateToPrice(y);
    if (price !== null) {
      updateHorizontalLine(selectedLine.id, { price });
      setToolboxPos(prev => prev ? { ...prev, y } : null);
    }
  }, [selectedLine, updateHorizontalLine, seriesRef]);

  const resolveChartTime = useCallback((param) => {
    if (param?.time != null) return param.time;
    if (!param?.point || !chartRef.current) return null;

    const timeScale = chartRef.current.timeScale();
    const coordinateTime = timeScale.coordinateToTime(param.point.x);
    if (coordinateTime != null) return coordinateTime;

    const logicalIndex = timeScale.coordinateToLogical(param.point.x);
    return Number.isFinite(logicalIndex) ? logicalIndex : null;
  }, [chartRef]);

  // Handle Shift angle snapping and Escape key to cancel drawing/unselect trendline
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') {
        isShiftPressedRef.current = true;
      } else if (e.key === 'Escape') {
        if (activeTool === 'trendLine' || drawingStateRef.current.isDrawing) {
          drawingStateRef.current = { isDrawing: false, startPoint: null, tempParam: null };
          const tempLine = containerRef.current?.querySelector('#svg_line_temp');
          if (tempLine) tempLine.remove();
          setActiveTool('cursor');
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        isShiftPressedRef.current = false;
      }
    };

    const handleBlur = () => {
      isShiftPressedRef.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [activeTool, setActiveTool, containerRef]);

  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;

    const chart = chartRef.current;

    const clickHandler = (param) => {
      if (!param || !param.point) {
        setSelectedLine(null);
        setToolboxPos(null);
        return;
      }

      if (activeTool === 'horizontalLine') {
        const targetSeries = getSeriesForPane(param.paneIndex ?? 0);
        let price = targetSeries?.coordinateToPrice(param.point.y);
        if (price === null && seriesRef.current) {
          price = seriesRef.current.coordinateToPrice(param.point.y);
        }
        if (price !== null) {
          const newLine = {
            id: Math.random().toString(36).substr(2, 9),
            price: price,
            color: '#2962FF',
            width: 2,
            style: 0
          };
          drawingsRef.current.horizontalLines.push(newLine);
          saveDrawings();
          renderDrawings();
          setActiveTool('cursor');
        }
      } else if (activeTool === 'trendLine') {
        const paneIndex = param.paneIndex ?? 0;
        const targetSeries = getSeriesForPane(paneIndex);
        let price = targetSeries?.coordinateToPrice(param.point.y);
        if (price === null && seriesRef.current) {
          price = seriesRef.current.coordinateToPrice(param.point.y);
        }
        if (price === null) {
          price = param.point.y;
        }

        const timeScale = chart.timeScale();
        const time = param.time ?? timeScale.coordinateToTime(param.point.x) ?? null;
        const logicalIndex = param.logical ?? timeScale.coordinateToLogical(param.point.x) ?? 0;

        if (!drawingStateRef.current.isDrawing) {
          drawingStateRef.current = {
            isDrawing: true,
            startPoint: { time, value: price, logicalIndex, paneIndex, rawX: param.point.x, rawY: param.point.y },
            tempParam: null
          };
        } else {
          const startPoint = drawingStateRef.current.startPoint;
          const endPoint = drawingStateRef.current.tempParam || {
            time,
            value: price,
            logicalIndex,
            paneIndex,
            rawX: param.point.x,
            rawY: param.point.y
          };

          drawingStateRef.current = { isDrawing: false, startPoint: null, tempParam: null };
          const tempLine = containerRef.current?.querySelector('#svg_line_temp');
          if (tempLine) tempLine.remove();

          const x1 = getPointCoordinate(startPoint);
          const y1 = getPointY(startPoint);
          const x2 = getPointCoordinate(endPoint);
          const y2 = getPointY(endPoint);

          if (x1 !== null && y1 !== null && x2 !== null && y2 !== null && (x1 !== x2 || y1 !== y2)) {
            const newTl = {
              id: Math.random().toString(36).substr(2, 9),
              points: [startPoint, endPoint],
              color: '#2962FF',
              width: 2,
              style: 0
            };
            drawingsRef.current.trendLines.push(newTl);
            saveDrawings();
            renderDrawings();
            // Auto select so anchors and toolbar show up
            setSelectedLine(newTl);
            setToolboxPos({ x: param.point.x, y: param.point.y });
          }
          setActiveTool('cursor');
        }
      } else if (activeTool === 'cursor') {
        // Check if we clicked on an existing horizontal line
        const clickedPrice = seriesRef.current.coordinateToPrice(param.point.y);
        if (clickedPrice !== null) {
          const threshold = (seriesRef.current.coordinateToPrice(param.point.y - 10) - seriesRef.current.coordinateToPrice(param.point.y + 10)) / 2; // rough threshold
          const absThreshold = Math.abs(threshold);
          
          const clickedLine = drawingsRef.current.horizontalLines.find(
            l => Math.abs(l.price - clickedPrice) < absThreshold
          );

          if (clickedLine) {
            setSelectedLine(clickedLine);
            setToolboxPos({ x: param.point.x, y: param.point.y });
          } else {
            setSelectedLine(null);
            setToolboxPos(null);
          }
        }
      }
    };

    const moveHandler = (param) => {
      if (activeTool === 'trendLine' && drawingStateRef.current.isDrawing) {
        if (!param || !param.point) return;
        lastMouseParamRef.current = param;
        const startPoint = drawingStateRef.current.startPoint;
        if (!startPoint) return;

        const x1 = getPointCoordinate(startPoint);
        const y1 = getPointY(startPoint);
        if (x1 === null || y1 === null) return;

        let curX = param.point.x;
        let curY = param.point.y;

        const isShift = isShiftPressedRef.current || !!param.sourceEvent?.shiftKey;
        if (isShift) {
          const dx = curX - x1;
          const dy = curY - y1;
          if (dx !== 0 || dy !== 0) {
            const angle = Math.atan2(dy, dx);
            const deg = angle * (180 / Math.PI);
            const snappedDeg = Math.round(deg / 45) * 45;
            const snappedRad = snappedDeg * (Math.PI / 180);
            const dist = Math.hypot(dx, dy);
            curX = x1 + dist * Math.cos(snappedRad);
            curY = y1 + dist * Math.sin(snappedRad);
          }
        }

        const paneIndex = param.paneIndex ?? startPoint.paneIndex ?? 0;
        const targetSeries = getSeriesForPane(paneIndex);
        let price = targetSeries?.coordinateToPrice(curY);
        if (price === null && seriesRef.current) {
          price = seriesRef.current.coordinateToPrice(curY);
        }
        if (price === null) {
          price = curY;
        }

        const timeScale = chart.timeScale();
        const time = timeScale.coordinateToTime(curX) ?? null;
        const logicalIndex = timeScale.coordinateToLogical(curX) ?? 0;

        drawingStateRef.current.tempParam = {
          time,
          value: price,
          logicalIndex,
          paneIndex,
          rawX: curX,
          rawY: curY
        };
      }
    };

    chart.subscribeClick(clickHandler);
    chart.subscribeCrosshairMove(moveHandler);

    return () => {
      chart.unsubscribeClick(clickHandler);
      chart.unsubscribeCrosshairMove(moveHandler);
    };
  }, [activeTool, saveDrawings, renderDrawings, chartRef, seriesRef, resolveChartTime, getPointCoordinate, getPointY, getSeriesForPane]);

  const getAnchorY = useCallback(() => {
    if (seriesRef.current && selectedLine) {
      return seriesRef.current.priceToCoordinate(selectedLine.price);
    }
    return null;
  }, [selectedLine, seriesRef]);

    const updateLine = useCallback((id, updates) => {
      const hlIndex = drawingsRef.current.horizontalLines.findIndex(l => l.id === id);
      if (hlIndex !== -1) {
        updateHorizontalLine(id, updates);
        return;
      }
      const tlIndex = drawingsRef.current.trendLines.findIndex(l => l.id === id);
      if (tlIndex !== -1) {
        updateTrendLine(id, updates);
      }
    }, [updateHorizontalLine, updateTrendLine]);

    const deleteLine = useCallback((id) => {
      const hlIndex = drawingsRef.current.horizontalLines.findIndex(l => l.id === id);
      if (hlIndex !== -1) {
        deleteHorizontalLine(id);
        return;
      }
      const tlIndex = drawingsRef.current.trendLines.findIndex(l => l.id === id);
      if (tlIndex !== -1) {
        deleteTrendLine(id);
      }
    }, [deleteHorizontalLine, deleteTrendLine]);

  return {
    activeTool,
    setActiveTool,
    clearAllDrawings,
    selectedLine,
    toolboxPos,
    updateLine,
    deleteLine,
    closeToolbox: () => { setSelectedLine(null); setToolboxPos(null); }
  };
}
