import { AiFillPlusCircle, AiFillMinusCircle, AiFillCaretLeft, AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from "react-icons/ai";

function MapControls({ onZoomIn, onZoomOut, onPanUp, onPanDown, onPanLeft, onPanRight }) {
  return (
    <div className="map-controls" role="group" aria-label="Map controls">
      <div className="zoom-row">
        <button type="button" onClick={onZoomIn} aria-label="Zoom in" title="Zoom in">
          <AiFillPlusCircle size="1.5em" />
        </button>
        <button type="button" onClick={onZoomOut} aria-label="Zoom out" title="Zoom out">
          <AiFillMinusCircle size="1.5em" />
        </button>
      </div>
      <button type="button" className="pan-up" onClick={onPanUp} aria-label="Pan up" title="Pan up">
        <AiFillCaretUp size="1.4em" />
      </button>
      <button type="button" className="pan-left" onClick={onPanLeft} aria-label="Pan left" title="Pan left">
        <AiFillCaretLeft size="1.4em" />
      </button>
      <button type="button" className="pan-right" onClick={onPanRight} aria-label="Pan right" title="Pan right">
        <AiFillCaretRight size="1.4em" />
      </button>
      <button type="button" className="pan-down" onClick={onPanDown} aria-label="Pan down" title="Pan down">
        <AiFillCaretDown size="1.4em" />
      </button>
    </div>
  );
}

export default MapControls;
