import { useState, useCallback } from 'react';

const PANEL_OFFSET = 8;

/**
 * Floating control panel for the selected element in design mode.
 * Renders four actions: Change Color, Change Size, Remove, Reposition.
 * All DOM changes are performed by parent via callbacks (pure JS in content script).
 */
export default function ControlPanel({
  position,
  initialWidth = 100,
  initialHeight = 100,
  onColorChange,
  onSizeChange,
  onRemove,
  onReposition,
  onRepositionDone,
  isRepositionMode,
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizeControls, setShowSizeControls] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const handleColorOpen = useCallback(() => {
    setShowSizeControls(false);
    setShowColorPicker((prev) => !prev);
  }, []);

  const handleSizeOpen = useCallback(() => {
    setShowColorPicker(false);
    setWidth(initialWidth);
    setHeight(initialHeight);
    setShowSizeControls((prev) => !prev);
  }, [initialWidth, initialHeight]);

  const handleColorInput = useCallback(
    (e) => {
      const value = e.target.value;
      setColor(value);
      onColorChange(value);
    },
    [onColorChange]
  );

  const handleWidthInput = useCallback(
    (e) => {
      const value = Number(e.target.value);
      setWidth(value);
      onSizeChange({ width: value, height });
    },
    [height, onSizeChange]
  );

  const handleHeightInput = useCallback(
    (e) => {
      const value = Number(e.target.value);
      setHeight(value);
      onSizeChange({ width, height: value });
    },
    [width, onSizeChange]
  );

  const handleRemove = useCallback(() => {
    onRemove();
  }, [onRemove]);

  const handleReposition = useCallback(() => {
    if (isRepositionMode) {
      onRepositionDone();
    } else {
      onReposition();
    }
  }, [isRepositionMode, onReposition, onRepositionDone]);

  return (
    <div
      className="restyld-panel"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y + position.height + PANEL_OFFSET,
        zIndex: 2147483647,
      }}
    >
      <div className="restyld-panel-card">
        <div className="restyld-panel-buttons">
          <button
            type="button"
            className="restyld-btn restyld-btn-color"
            onClick={handleColorOpen}
            title="Change background color"
          >
            Change Color
          </button>
          <button
            type="button"
            className="restyld-btn restyld-btn-size"
            onClick={handleSizeOpen}
            title="Change width and height"
          >
            Change Size
          </button>
          <button
            type="button"
            className="restyld-btn restyld-btn-remove"
            onClick={handleRemove}
            title="Remove element from page"
          >
            Remove
          </button>
          <button
            type="button"
            className={`restyld-btn restyld-btn-reposition ${isRepositionMode ? 'active' : ''}`}
            onClick={handleReposition}
            title={isRepositionMode ? 'Done moving' : 'Drag to reposition'}
          >
            {isRepositionMode ? 'Done' : 'Reposition'}
          </button>
        </div>

        {showColorPicker && (
          <div className="restyld-panel-section">
            <label className="restyld-label">Background color</label>
            <input
              type="color"
              value={color}
              onChange={handleColorInput}
              className="restyld-color-input"
              aria-label="Pick background color"
            />
          </div>
        )}

        {showSizeControls && (
          <div className="restyld-panel-section">
            <label className="restyld-label">Width: {width}px</label>
            <input
              type="range"
              min={0}
              max={2000}
              value={width}
              onChange={handleWidthInput}
              className="restyld-slider"
            />
            <label className="restyld-label">Height: {height}px</label>
            <input
              type="range"
              min={0}
              max={2000}
              value={height}
              onChange={handleHeightInput}
              className="restyld-slider"
            />
          </div>
        )}
      </div>
    </div>
  );
}
