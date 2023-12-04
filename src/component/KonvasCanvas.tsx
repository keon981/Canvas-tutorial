import React, { useState } from 'react'
import { Stage } from 'react-konva'
import LineGrid from './LineGrid'

function KonvasCanvas() {
  const [scale, setScale] = useState<number>(1)
  const [stagePos, setStagePos] = useState<StatePosType>({
    x: 0,
    y: 0,
  })
  const canvasWidth:number = 600
  const canvasHeight:number = 400

  const handleScale = () => {
    const scaleVal = scale + 1 > 6 ? 1 : scale + 1
    setScale(scaleVal)
  }

  return (
    <section style={{
      width: '600px',
      margin: '20px auto',
    }}
    >
      <button type="button" onClick={handleScale}>縮放{scale}</button>
      <div id="konvas-canvas">
        <Stage
          x={stagePos.x}
          y={stagePos.y}
          width={canvasWidth}
          height={canvasHeight}
          strokeWidth={1}
          draggable
          onDragMove={(e) => {
            const { x, y } = e.currentTarget.position()
            setStagePos({
              x: Math.round(x),
              y: Math.round(y),
            })
          }}
        >
          <LineGrid
            scale={scale}
            stagePos={stagePos}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </Stage>
      </div>
    </section>
  )
}

export default KonvasCanvas
