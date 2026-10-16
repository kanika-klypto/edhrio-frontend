import { useEffect, useRef } from "react";

const COUNT = 46;
const colors = {
  bull: "#0f9d6c",
  bear: "#e5484d",
  brand: "#FE6C02",
  amber: "#f59e0b",
};
const chartThemes = {
  light: {
    grid: "rgba(15, 23, 42, 0.07)",
    axis: "rgba(15, 23, 42, 0.55)",
    cross: "rgba(15, 23, 42, 0.35)",
    tooltip: "#0f172a",
  },
  dark: {
    grid: "rgba(226, 232, 240, 0.12)",
    axis: "rgba(226, 232, 240, 0.68)",
    cross: "rgba(226, 232, 240, 0.45)",
    tooltip: "#000000",
  },
};

const formatAxis = (value) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 1 });
const makeCandle = (open) => ({
  o: open,
  c: open,
  h: open,
  l: open,
  v: 0.35 + Math.random() * 0.5,
});

function evolve(candle) {
  candle.c += (Math.random() - 0.487) * candle.c * 0.004;
  candle.h = Math.max(candle.h, candle.c);
  candle.l = Math.min(candle.l, candle.c);
  candle.v = Math.min(1, candle.v + Math.random() * 0.08);
}

function movingAverage(candles, period) {
  const weight = 2 / (period + 1);
  let value = candles[0].o;
  return candles.map((candle, index) => {
    value = index === 0 ? candle.o : candle.c * weight + value * (1 - weight);
    return value;
  });
}

export function CandleChart({ onTick }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const onTickRef = useRef(onTick);
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const candles = [];
    let openingPrice = 24500;
    for (let index = 0; index < COUNT; index += 1) {
      const candle = makeCandle(openingPrice);
      for (let step = 0; step < 8; step += 1) evolve(candle);
      candles.push(candle);
      openingPrice = candle.c;
    }

    const mouse = { x: -1, y: -1, inside: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let tick = 0;
    let lastEmit = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    resize();
    observer.observe(wrap);

    const onMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
      mouse.inside = true;
    };
    const onLeave = () => {
      mouse.inside = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      if (!width || !height) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const palette =
        chartThemes[
          document.documentElement.dataset.theme === "dark" ? "dark" : "light"
        ];
      tick += 1;
      const last = candles[candles.length - 1];
      evolve(last);
      if (tick % 30 === 0) {
        candles.push(makeCandle(last.c));
        if (candles.length > COUNT) candles.shift();
      }
      const price = last.c;
      if (Date.now() - lastEmit > 400) {
        lastEmit = Date.now();
        onTickRef.current?.({
          price,
          change: ((price - candles[0].o) / candles[0].o) * 100,
        });
      }

      context.clearRect(0, 0, width, height);
      const rightPad = 62;
      const bottomPad = 18;
      const chartWidth = width - rightPad;
      const volumeHeight = height * 0.18;
      const priceHeight = height - volumeHeight - bottomPad;
      const high = Math.max(...candles.map((c) => c.h)) * 1.001;
      const low = Math.min(...candles.map((c) => c.l)) * 0.999;
      const y = (value) =>
        priceHeight - ((value - low) / (high - low)) * (priceHeight - 14) - 4;
      const candleWidth = chartWidth / candles.length;
      const bodyWidth = Math.max(3, candleWidth * 0.6);

      context.font = '9px "JetBrains Mono", monospace';
      for (let line = 0; line <= 4; line += 1) {
        const gridY = 6 + ((priceHeight - 12) / 4) * line;
        const gridPrice = high - ((high - low) / 4) * line;
        context.strokeStyle = palette.grid;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, gridY);
        context.lineTo(chartWidth, gridY);
        context.stroke();
        context.fillStyle = palette.axis;
        context.fillText(formatAxis(gridPrice), chartWidth + 6, gridY + 3);
      }

      candles.forEach((candle, index) => {
        const x = index * candleWidth + (candleWidth - bodyWidth) / 2;
        context.fillStyle =
          candle.c >= candle.o
            ? "rgba(15,157,108,0.22)"
            : "rgba(229,72,77,0.22)";
        const barHeight = candle.v * volumeHeight * 0.9;
        context.fillRect(
          x,
          height - bottomPad - barHeight,
          bodyWidth,
          barHeight,
        );
      });

      const drawAverage = (values, color, glow) => {
        context.strokeStyle = color;
        context.lineWidth = 1.6;
        context.shadowColor = color;
        context.shadowBlur = glow ? 6 : 0;
        context.beginPath();
        values.forEach((value, index) => {
          const x = index * candleWidth + candleWidth / 2;
          if (index === 0) context.moveTo(x, y(value));
          else context.lineTo(x, y(value));
        });
        context.stroke();
        context.shadowBlur = 0;
      };
      drawAverage(movingAverage(candles, 20), colors.brand, true);
      drawAverage(movingAverage(candles, 50), colors.amber, false);

      candles.forEach((candle, index) => {
        const x = index * candleWidth + candleWidth / 2;
        context.strokeStyle = context.fillStyle =
          candle.c >= candle.o ? colors.bull : colors.bear;
        context.lineWidth = 1.2;
        context.beginPath();
        context.moveTo(x, y(candle.h));
        context.lineTo(x, y(candle.l));
        context.stroke();
        const top = y(Math.max(candle.o, candle.c));
        const bottom = y(Math.min(candle.o, candle.c));
        context.fillRect(
          x - bodyWidth / 2,
          top,
          bodyWidth,
          Math.max(1.5, bottom - top),
        );
      });

      const rising = last.c >= last.o;
      const currentY = y(price);
      context.setLineDash([4, 4]);
      context.strokeStyle = rising
        ? "rgba(15,157,108,0.55)"
        : "rgba(229,72,77,0.55)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, currentY);
      context.lineTo(chartWidth, currentY);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = rising ? colors.bull : colors.bear;
      context.beginPath();
      context.roundRect(chartWidth + 2, currentY - 9, rightPad - 6, 18, 4);
      context.fill();
      context.fillStyle = "#fff";
      context.font = 'bold 9px "JetBrains Mono", monospace';
      context.fillText(formatAxis(price), chartWidth + 7, currentY + 3);

      const lastX = (candles.length - 1) * candleWidth + candleWidth / 2;
      const pulse = 3 + Math.sin(tick / 9) * 1.6;
      context.fillStyle = rising
        ? "rgba(15,157,108,0.25)"
        : "rgba(229,72,77,0.25)";
      context.beginPath();
      context.arc(lastX, currentY, pulse + 4, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = rising ? colors.bull : colors.bear;
      context.beginPath();
      context.arc(lastX, currentY, 3, 0, Math.PI * 2);
      context.fill();

      const timeAt = (index) => {
        const minutes = 9 * 60 + 15 + index * 5;
        return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
      };
      context.fillStyle = palette.axis;
      context.font = '9px "JetBrains Mono", monospace';
      context.fillText(timeAt(0), 2, height - 5);
      context.fillText(timeAt(candles.length - 1), chartWidth - 34, height - 5);

      if (mouse.inside && mouse.x < chartWidth && mouse.y < priceHeight) {
        const index = Math.min(
          candles.length - 1,
          Math.max(0, Math.floor(mouse.x / candleWidth)),
        );
        context.setLineDash([3, 4]);
        context.strokeStyle = palette.cross;
        context.beginPath();
        context.moveTo(mouse.x, 0);
        context.lineTo(mouse.x, priceHeight);
        context.moveTo(0, mouse.y);
        context.lineTo(chartWidth, mouse.y);
        context.stroke();
        context.setLineDash([]);
        const hoveredPrice =
          low +
          ((priceHeight - 14 - mouse.y + 4) / (priceHeight - 14)) *
            (high - low);
        context.fillStyle = palette.tooltip;
        context.beginPath();
        context.roundRect(chartWidth + 2, mouse.y - 9, rightPad - 6, 18, 4);
        context.fill();
        context.fillStyle = "#fff";
        context.font = 'bold 9px "JetBrains Mono", monospace';
        context.fillText(formatAxis(hoveredPrice), chartWidth + 7, mouse.y + 3);
        context.fillStyle = palette.tooltip;
        context.beginPath();
        context.roundRect(
          index * candleWidth + candleWidth / 2 - 21,
          height - 15,
          42,
          13,
          3,
        );
        context.fill();
        context.fillStyle = "#fff";
        context.fillText(
          timeAt(index),
          index * candleWidth + candleWidth / 2 - 13,
          height - 5,
        );
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="h-full w-full "
      data-testid="hero-candlestick-canvas-wrap"
    >
      <canvas
        ref={canvasRef}
        className="block"
        data-testid="hero-candlestick-canvas"
        aria-label="Simulated live NIFTY 50 candlestick chart"
      />
    </div>
  );
}
