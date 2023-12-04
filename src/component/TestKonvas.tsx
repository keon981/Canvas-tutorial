import {
  Circle, Layer, Rect, Stage,
} from 'react-konva'

function TestKonvas() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={50} height={50} stroke="red" />
        <Circle x={200} y={200} fill="blue" radius={120} />
      </Layer>
    </Stage>

  )
}

export default TestKonvas
