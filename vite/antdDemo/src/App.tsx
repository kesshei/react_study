import "allotment/dist/style.css";
import { Allotment } from "allotment";
import './App.css'

function App() {
  return (
    <Allotment>
      <Allotment.Pane minSize={100} maxSize={100}>
        <div>Pane 1</div>
      </Allotment.Pane>
      <Allotment.Pane minSize={200}>
        <div>Pane 2</div>
      </Allotment.Pane>
      <Allotment.Pane visible={true} minSize={100}>
        <div>Pane 3</div>
      </Allotment.Pane>
    </Allotment>
  )
}

export default App
