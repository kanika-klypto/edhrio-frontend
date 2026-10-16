import { HiPlus } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import {
  LuMousePointer2,
  LuMinus,
  LuGitBranch,
  LuMoveHorizontal,
  LuMoveVertical,
  LuCrosshair,
  LuChartNoAxesCombined,
  LuSpline,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignVerticalSpaceAround,
  LuAlignHorizontalSpaceAround,
  LuStretchHorizontal,
  LuFan,
  LuTarget,
  LuCircleDot,
  LuRadar,
  LuTriangle,
  LuNetwork,
  LuLayoutGrid,
  LuSquare,
  LuShare2,
  LuActivity,
  LuTrendingUp,
  LuTrendingDown,
  LuWaves,
  LuLayers,
  LuMaximize2,
  LuBrush,
  LuHighlighter,
  LuMoveUpRight,
  LuArrowUpRight,
  LuArrowUp,
  LuArrowDown,
  LuDiamond,
  LuCircle,
  LuWaypoints,
  LuRainbow,
  LuType,
  LuStickyNote,
  LuBadgeDollarSign,
  LuMapPin,
  LuTable,
  LuMessageSquare,
  LuMessageCircle,
  LuTag,
  LuSignpost,
  LuFlag,
  LuImage,
  LuLightbulb,
  LuSmile,
  LuStar,
  LuHeart,
  LuThumbsUp,
  LuFlame,
  LuRocket,
} from "react-icons/lu";
import { MdTimeline } from "react-icons/md";
import {
  CrosshairIcon,
  TrendLineIcon,
  RayIcon,
  InfoLineIcon,
  ExtendedLineIcon,
  TrendAngleIcon,
  HorizontalLineIcon,
  HorizontalRayIcon,
  VerticalLineIcon,
  CrossLineIcon,
  ParallelChannelIcon,
  RegressionTrendIcon,
  FlatTopBottomIcon,
  DisjointChannelIcon,
  FibonacciLinesIcon,
  FibExtensionIcon,
  FibChannelIcon,
  FibTimeZoneIcon,
  FibSpeedFanIcon,
  FibTimeExtensionIcon,
  FibCirclesIcon,
  FibSpiralIcon,
  FibSpeedArcsIcon,
  FibWedgeIcon,
  PitchfanIcon,
  GannBoxIcon,
  GannSquareFixedIcon,
  GannSquareIcon,
  GannFanIcon,
  HarmonicPatternIcon,
  CypherPatternIcon,
  HeadAndShouldersIcon,
  AbcdPatternIcon,
  TrianglePatternIcon,
  ThreeDrivesPatternIcon,
  ElliottImpulseIcon,
  ElliottCorrectionIcon,
  ElliottTriangleIcon,
  ElliottDoubleComboIcon,
  ElliottTripleComboIcon,
  CyclicLinesIcon,
  TimeCyclesIcon,
  SineLineIcon,
  LongPositionIcon,
  ShortPositionIcon,
  PositionForecastIcon,
  BarsPatternIcon,
  GhostFeedIcon,
  SectorIcon,
  AnchoredVwapIcon,
  FixedRangeVolumeProfileIcon,
  AnchoredVolumeProfileIcon,
  PriceRangeIcon,
  DateRangeIcon,
  DateAndPriceRangeIcon,
  BrushToolIcon,
  TextSerifIcon,
  SmileyFaceIcon,
} from "../assets/drawingIcons";

export const lineTools = [
  { id: "trendLine", label: "Trendline", shortcut: "Alt + T", icon: TrendLineIcon },
  { id: "ray", label: "Ray", icon: RayIcon },
  { id: "infoLine", label: "Info line", icon: InfoLineIcon },
  { id: "extendedLine", label: "Extended line", icon: ExtendedLineIcon },
  { id: "trendAngle", label: "Trend angle", icon: TrendAngleIcon },
  { id: "horizontalLine", label: "Horizontal line", shortcut: "Alt + H", icon: HorizontalLineIcon },
  { id: "horizontalRay", label: "Horizontal ray", shortcut: "Alt + J", icon: HorizontalRayIcon },
  { id: "verticalLine", label: "Vertical line", shortcut: "Alt + V", icon: VerticalLineIcon },
  { id: "crossline", label: "Crossline", shortcut: "Alt + C", icon: CrossLineIcon },
];

export const channelTools = [
  { id: "parallelChannel", label: "Parallel channel", icon: ParallelChannelIcon },
  { id: "regressionTrend", label: "Regression trend", icon: RegressionTrendIcon },
  { id: "flatTopBottom", label: "Flat top/bottom", icon: FlatTopBottomIcon },
  { id: "disjointChannel", label: "Disjoint channel", icon: DisjointChannelIcon },
];

export const fibonacciTools = [
  { id: "fibRetracement", label: "Fib retracement", shortcut: "Alt + F", icon: FibonacciLinesIcon },
  { id: "fibExtension", label: "Trend-based fib extension", icon: FibExtensionIcon },
  { id: "fibChannel", label: "Fib channel", icon: FibChannelIcon },
  { id: "fibTimeZone", label: "Fib time zone", icon: FibTimeZoneIcon },
  { id: "fibSpeedFan", label: "Fib speed resistance fan", icon: FibSpeedFanIcon },
  { id: "fibTimeExtension", label: "Trend-based fib time", icon: FibTimeExtensionIcon },
  { id: "fibCircles", label: "Fib circles", icon: FibCirclesIcon },
  { id: "fibSpiral", label: "Fib spiral", icon: FibSpiralIcon },
  { id: "fibSpeedArcs", label: "Fib speed resistance arcs", icon: FibSpeedArcsIcon },
  { id: "fibWedge", label: "Fib wedge", icon: FibWedgeIcon },
  { id: "pitchfan", label: "Pitchfan", icon: PitchfanIcon },
];

export const gannTools = [
  { id: "gannBox", label: "Gann box", icon: GannBoxIcon },
  { id: "gannSquareFixed", label: "Gann square fixed", icon: GannSquareFixedIcon },
  { id: "gannSquare", label: "Gann square", icon: GannSquareIcon },
  { id: "gannFan", label: "Gann fan", icon: GannFanIcon },
];

export const chartPatternTools = [
  { id: "xabcdPattern", label: "XABCD pattern", icon: HarmonicPatternIcon },
  { id: "cypherPattern", label: "Cypher pattern", icon: CypherPatternIcon },
  { id: "headAndShoulders", label: "Head and shoulders", icon: HeadAndShouldersIcon },
  { id: "abcdPattern", label: "ABCD pattern", icon: AbcdPatternIcon },
  { id: "trianglePattern", label: "Triangle pattern", icon: TrianglePatternIcon },
  { id: "threeDrivesPattern", label: "Three drives pattern", icon: ThreeDrivesPatternIcon },
];

export const elliottTools = [
  { id: "elliottImpulse", label: "Elliott impulse wave (1·2·3·4·5)", icon: ElliottImpulseIcon },
  { id: "elliottCorrection", label: "Elliott correction wave (A·B·C)", icon: ElliottCorrectionIcon },
  { id: "elliottTriangle", label: "Elliott triangle wave (A·B·C·D·E)", icon: ElliottTriangleIcon },
  { id: "elliottDoubleCombo", label: "Elliott double combo wave (W·X·Y)", icon: ElliottDoubleComboIcon },
  { id: "elliottTripleCombo", label: "Elliott triple combo wave (W·X·Y·X·Z)", icon: ElliottTripleComboIcon },
];

export const cycleTools = [
  { id: "cyclicLines", label: "Cyclic lines", icon: CyclicLinesIcon },
  { id: "timeCycles", label: "Time cycles", icon: TimeCyclesIcon },
  { id: "sineLine", label: "Sine line", icon: SineLineIcon },
];

export const forecastingTools = [
  { id: "longPosition", label: "Long position", icon: LongPositionIcon },
  { id: "shortPosition", label: "Short position", icon: ShortPositionIcon },
  { id: "positionForecast", label: "Position forecast", icon: PositionForecastIcon },
  { id: "barsPattern", label: "Bars pattern", icon: BarsPatternIcon },
  { id: "ghostFeed", label: "Ghost feed", icon: GhostFeedIcon },
  { id: "sector", label: "Sector", icon: SectorIcon },
];

export const volumeTools = [
  { id: "anchoredVwap", label: "Anchored VWAP", icon: AnchoredVwapIcon },
  { id: "fixedRangeVolumeProfile", label: "Fixed range volume profile", icon: FixedRangeVolumeProfileIcon },
  { id: "anchoredVolumeProfile", label: "Anchored volume profile", icon: AnchoredVolumeProfileIcon },
];

export const measurerTools = [
  { id: "priceRange", label: "Price range", icon: PriceRangeIcon },
  { id: "dateRange", label: "Date range", icon: DateRangeIcon },
  { id: "dateAndPriceRange", label: "Date and price range", icon: DateAndPriceRangeIcon },
];

export const brushTools = [
  { id: "brush", label: "Brush", icon: BrushToolIcon },
  { id: "highlighter", label: "Highlighter", icon: LuHighlighter },
];

export const arrowTools = [
  { id: "arrowMarker", label: "Arrow marker", icon: LuMoveUpRight },
  { id: "arrow", label: "Arrow", icon: LuArrowUpRight },
  { id: "arrowMarkUp", label: "Arrow mark up", icon: LuArrowUp },
  { id: "arrowMarkDown", label: "Arrow mark down", icon: LuArrowDown },
];

export const shapeTools = [
  { id: "rectangle", label: "Rectangle", shortcut: "Alt + Shift + R", icon: LuSquare },
  { id: "rotatedRectangle", label: "Rotated rectangle", icon: LuDiamond },
  { id: "path", label: "Path", icon: LuSpline },
  { id: "circle", label: "Circle", icon: LuCircle },
  { id: "ellipse", label: "Ellipse", icon: LuCircle },
  { id: "polyline", label: "Polyline", icon: LuWaypoints },
  { id: "triangle", label: "Triangle", icon: LuTriangle },
  { id: "arc", label: "Arc", icon: LuRainbow },
];

export const textTools = [
  { id: "text", label: "Text", icon: TextSerifIcon },
  { id: "note", label: "Note", icon: LuStickyNote },
  { id: "priceNote", label: "Price note", icon: LuBadgeDollarSign },
  { id: "pin", label: "Pin", icon: LuMapPin },
  { id: "table", label: "Table", icon: LuTable },
  { id: "callout", label: "Callout", icon: LuMessageSquare },
  { id: "comment", label: "Comment", icon: LuMessageCircle },
  { id: "priceLabel", label: "Price label", icon: LuTag },
  { id: "signpost", label: "Signpost", icon: LuSignpost },
  { id: "flagMark", label: "Flag mark", icon: LuFlag },
];

export const contentTools = [
  { id: "image", label: "Image", icon: LuImage },
  { id: "post", label: "Post", icon: FaXTwitter },
  { id: "idea", label: "Idea", icon: LuLightbulb },
];

export const iconTools = [
  { id: "smile", label: "Smiley", icon: SmileyFaceIcon },
  { id: "heart", label: "Heart", icon: LuHeart },
  { id: "star", label: "Star", icon: LuStar },
  { id: "thumbsUp", label: "Thumbs Up", icon: LuThumbsUp },
  { id: "fire", label: "Fire", icon: LuFlame },
  { id: "rocket", label: "Rocket", icon: LuRocket },
];

/* One entry = one split button (icon + chevron) with its own flyout menu */
export const toolGroups = [
  {
    id: "lines",
    label: "Trend line tools",
    sections: [
      { title: "Lines", tools: lineTools },
      { title: "Channels", tools: channelTools },
    ],
  },
  {
    id: "fibGann",
    label: "Gann and Fibonacci tools",
    sections: [
      { title: "Fibonacci", tools: fibonacciTools },
      { title: "Gann", tools: gannTools },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    sections: [
      { title: "Chart patterns", tools: chartPatternTools },
      { title: "Elliott waves", tools: elliottTools },
      { title: "Cycles", tools: cycleTools },
    ],
  },
  {
    id: "forecasting",
    label: "Forecasting and measurers",
    sections: [
      { title: "Forecasting", tools: forecastingTools },
      { title: "Volume-based", tools: volumeTools },
      { title: "Measurers", tools: measurerTools },
    ],
  },
  {
    id: "shapes",
    label: "Brushes, arrows and shapes",
    sections: [
      { title: "Brushes", tools: brushTools },
      { title: "Arrows", tools: arrowTools },
      { title: "Shapes", tools: shapeTools },
    ],
  },
  {
    id: "textNotes",
    label: "Text and notes tools",
    sections: [
      { title: "Text and notes", tools: textTools },
      { title: "Content", tools: contentTools },
    ],
  },
  {
    id: "icons",
    label: "Icons and stickers",
    sections: [
      { title: "Icons", tools: iconTools },
    ],
  },
];

export const cursorOptions = [
  { id: "cross", label: "Cross", icon: CrosshairIcon },
  { id: "dot", label: "Dot", icon: LuCircleDot },
  { id: "arrow", label: "Arrow", icon: LuMousePointer2 },
];
