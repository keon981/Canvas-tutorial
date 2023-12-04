import React from 'react'
import { Layer, Line, Rect } from 'react-konva'
import { color } from 'src/style/variable'

type Props = {
  scale:number;
  stagePos:StatePosType;
  canvasWidth:number;
  canvasHeight:number;
}

type LineStrokeProps = {
  storkeWidth : number,
  strokeOpacity : number,
  shadowEnbled : boolean,
}

function LineGrid({
  scale, stagePos, canvasWidth, canvasHeight,
}: Props) {
  const { solidColor, dashedColor, zeroColor } = color
  const gridComponents = []
  const gridSize = (100 * scale) / 20
  const canvasXHeight = canvasHeight - stagePos.y
  const canvasYWidth = canvasWidth - stagePos.x
  const pointsWidth = [0, 0, canvasWidth, 0]
  const pointsHeight = [0, 0, 0, canvasHeight]
  const LineStrokeProps:LineStrokeProps = {
    storkeWidth: 1,
    strokeOpacity: 0,
    shadowEnbled: false,
  }

  const strokeStyle = (num:number) => {
    if (num === 0) return zeroColor
    return num % 5 ? solidColor : dashedColor
  }

  // start draw X grid line from pageSlicePos.y to +Y
  const xPageSliceTotal = Math.ceil(canvasXHeight / gridSize)
  for (let index = 0; index < xPageSliceTotal; index++) {
    gridComponents.push(
      <Line
        x={0 - stagePos.x}
        y={gridSize * index}
        points={pointsWidth}
        stroke={strokeStyle(index)}
        {...LineStrokeProps}
      />,
    )
  }

  // start draw X grid line from pageSlicePos.y to -Y
  const xRemaining = Math.ceil(stagePos.y / gridSize)
  for (let index = 1; index < xRemaining; index++) {
    gridComponents.push(
      <Line
        x={0 - stagePos.x}
        y={gridSize * index * (-1)}
        points={pointsWidth}
        stroke={strokeStyle(index)}
        {...LineStrokeProps}
      />,
    )
  }

  // start draw Y grid line from pageSlicePos.x to +X
  const yPageSliceTotal = Math.ceil(canvasYWidth / gridSize)
  for (let index = 0; index < yPageSliceTotal; index++) {
    gridComponents.push(
      <Line
        x={gridSize * index}
        y={0 - stagePos.y}
        points={pointsHeight}
        stroke={strokeStyle(index)}
        {...LineStrokeProps}
      />,
    )
  }

  // start draw Y grid line from pageSlicePos.x to +X
  const yRemaining = Math.ceil(stagePos.x / gridSize)
  for (let index = 1; index < yRemaining; index++) {
    gridComponents.push(
      <Line
        x={gridSize * index * (-1)}
        y={0 - stagePos.y}
        points={pointsHeight}
        stroke={strokeStyle(index)}
        {...LineStrokeProps}
      />,
    )
  }

  gridComponents.push(<Rect
    x={0}
    y={0}
    width={10}
    height={10}
    fill="red"
  />)

  return (
    <Layer>{gridComponents}</Layer>
  )
}

export default LineGrid
