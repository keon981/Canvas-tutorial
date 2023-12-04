/* eslint-disable no-continue */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import { color } from 'src/style/variable'

type PageSlicePosType = {
  x: number;
  y: number;
}

function Canvas() {
  const { solidColor, dashedColor, zeroColor } = color
  const [pageSlicePos, setPageSlicePos] = useState<PageSlicePosType>({
    x: 0,
    y: 0,
  })
  const [ctxVal, setCtxVal] = useState<null | CanvasRenderingContext2D>(null)
  const [scale, setScale] = useState<number>(1)

  const drawLineGrid = (scaleVal = scale) => {
    // 繪製網格
    const myCanvas:any = document.querySelector('#myCanvas')
    const ctx = ctxVal || myCanvas.getContext('2d')
    setCtxVal(ctx)
    const gridSize = 5 * scaleVal
    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height

    ctx.fillStyle = 'red'
    ctx.fillRect(pageSlicePos.x, pageSlicePos.y, 10, 10)

    const canvasXHeight = canvasHeight - pageSlicePos.y
    const canvasYWidth = canvasWidth - pageSlicePos.x

    // plan Y to X from pageSlicePos.y
    const xPageSliceTool = Math.ceil(canvasXHeight / gridSize)
    for (let i = 0; i < xPageSliceTool; i++) {
      ctx.beginPath()
      ctx.moveTo(0, pageSlicePos.y + gridSize * i)
      ctx.lineTo(canvasWidth, pageSlicePos.y + gridSize * i)
      const dottedLineStyle = (i % 5 === 0 ? solidColor : dashedColor)
      ctx.strokeStyle = i === 0 ? zeroColor : dottedLineStyle
      ctx.stroke()
    }

    const XRemaining = Math.ceil(pageSlicePos.y / gridSize)
    for (let i = 0; i < XRemaining; i++) {
      if (i === 0) continue
      ctx.beginPath()
      ctx.moveTo(0, pageSlicePos.y - gridSize * i)
      ctx.lineTo(canvasWidth, pageSlicePos.y - gridSize * i)

      const dottedLineStyle = (i % 5 === 0 ? solidColor : dashedColor)
      ctx.strokeStyle = i === 0 ? zeroColor : dottedLineStyle
      ctx.stroke()
    }

    // plan X to Y from pageSlicePos.y

    const yPageSliceTool = Math.ceil(canvasYWidth / gridSize)
    for (let i = 0; i < yPageSliceTool; i++) {
      if (i === 0) continue
      ctx.beginPath()
      ctx.moveTo(pageSlicePos.x + gridSize * i, 0)
      ctx.lineTo(pageSlicePos.x + gridSize * i, canvasHeight)

      const dottedLineStyle = (i % 5 === 0 ? solidColor : dashedColor)
      ctx.strokeStyle = i === 0 ? zeroColor : dottedLineStyle
      ctx.stroke()
    }

    const yRemaining = Math.ceil(pageSlicePos.x / gridSize)
    for (let i = 0; i < yRemaining; i++) {
      if (i === 0) continue
      ctx.beginPath()
      ctx.moveTo(pageSlicePos.x - gridSize * i, 0)
      ctx.lineTo(pageSlicePos.x - gridSize * i, canvasHeight)

      const dottedLineStyle = (i % 5 === 0 ? solidColor : dashedColor)
      ctx.strokeStyle = i === 0 ? zeroColor : dottedLineStyle
      ctx.stroke()
    }
  }

  const handleClickButton = () => {
    //  點擊按鈕，設置縮放數量
    const scaleVal = scale + 1 > 6 ? 1 : scale + 1
    setScale(scaleVal)
    if (ctxVal) {
      ctxVal.clearRect(0, 0, ctxVal.canvas.width, ctxVal.canvas.height)
    }
    drawLineGrid(scaleVal)
  }

  const handleMouseUp = (element:HTMLCanvasElement) => {
    element.onmouseup = () => {
      element.onmousemove = null
      element.onmouseup = null
    }
  }

  const mouseDown = () => {
    // 拖動canvas 動態渲染，拖動時，動態設置pageSlicePos 的值
    const { x, y } = pageSlicePos
    const myCanvas: any = document.querySelector('#myCanvas')

    myCanvas.onmousemove = (ev: any) => {
      setPageSlicePos({
        x: x + ev.clientX,
        y: y + ev.clientY,
      })
      handleMouseUp(myCanvas)
    }
    handleMouseUp(myCanvas)
  }

  useEffect(() => {
    // 監聽pageSlicePos 資料，有變動立刻重繪canvas
    if (ctxVal) {
      ctxVal.clearRect(0, 0, ctxVal.canvas.width, ctxVal.canvas.height)
    }
    drawLineGrid()
  }, [pageSlicePos])

  return (
    <div className="canvas">
      <div>
        <button
          type="button"
          onClick={handleClickButton}
        >
          縮放{scale}
        </button>
      </div>
      <div style={{
        width: '600px',
        margin: '0 auto',
      }}
      >
        <canvas
          id="myCanvas"
          width={600}
          height={400}
          onMouseDown={mouseDown}
        />
      </div>
    </div>
  )
}

export default Canvas
