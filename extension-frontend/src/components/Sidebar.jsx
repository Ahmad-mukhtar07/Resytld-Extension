import { useState, useCallback, useRef, useEffect } from 'react';

const PANEL_OFFSET = 8;
const PRESET_COLORS = [
  '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151', '#111827',
  '#fef2f2', '#fecaca', '#f87171', '#dc2626', '#991b1b',
  '#fef9c3', '#fde047', '#eab308', '#ca8a04',
  '#dcfce7', '#86efac', '#22c55e', '#15803d',
  '#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8',
  '#e9d5ff', '#c084fc', '#a855f7', '#6b21a8',
];

const FONT_FAMILIES = [
  'inherit',
  'system-ui, sans-serif',
  'Georgia, serif',
  '"Times New Roman", serif',
  'Arial, sans-serif',
  '"Helvetica Neue", sans-serif',
  'Verdana, sans-serif',
  'monospace',
];

const TEXT_ALIGN = ['left', 'center', 'right', 'justify'];
const BORDER_STYLES = ['none', 'solid', 'dashed', 'dotted', 'double'];

function parseNum(val) {
  if (val === '' || val == null) return null;
  const n = parseFloat(String(val));
  return isNaN(n) ? null : n;
}

export default function Sidebar({
  embedded = false,
  elementInfo = {},
  initialStyles = {},
  onStyleChange,
  onDeselect,
  onRemove,
  onReposition,
  onRepositionDone,
  isRepositionMode,
}) {
  const [minimized, setMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [openSections, setOpenSections] = useState({
    appearance: false,
    dimensions: false,
    typography: false,
    spacing: false,
    borders: false,
    effects: false,
  });
  const [stylesState, setStylesState] = useState(() => ({ ...initialStyles }));
  const onStyleChangeRef = useRef(onStyleChange);
  onStyleChangeRef.current = onStyleChange;

  useEffect(() => {
    setStylesState((prev) => ({ ...initialStyles, ...prev }));
  }, [initialStyles]);

  const updateStyle = useCallback((key, value) => {
    setStylesState((prev) => {
      const next = { ...prev, [key]: value };
      onStyleChangeRef.current?.(next);
      return next;
    });
  }, []);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startOffset = dragOffset;
    const onMove = (e2) => {
      const dx = startX - e2.clientX;
      setDragOffset(Math.max(0, startOffset + dx));
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const tag = elementInfo.tagName ? elementInfo.tagName.toLowerCase() : '—';
  const id = elementInfo.id || '';
  const classes = elementInfo.className || '';

  const s = stylesState;

  if (minimized && !embedded) {
    return (
      <div className="restyld-sb-minimizedTab">
        <button
          type="button"
          className="restyld-sb-expandBtn"
          onClick={() => setMinimized(false)}
          title="Expand sidebar"
          aria-label="Expand"
        >
          ◀
        </button>
        <button type="button" className="restyld-sb-deselectBtnMinimized" onClick={onDeselect}>
          Deselect
        </button>
      </div>
    );
  }

  const content = (
    <>
      {!embedded && (
        <div
          className="restyld-sb-dragHandle"
          onMouseDown={handleDragStart}
          title="Drag to move sidebar"
          role="presentation"
        />
      )}
      <div className="restyld-sb-content">
        <header className="restyld-sb-header">
          <div className="restyld-sb-headerRow">
            <h2 className="restyld-sb-title">Edit element</h2>
            {!embedded && (
              <button
                type="button"
                className="restyld-sb-minimizeBtn"
                onClick={() => setMinimized(true)}
                title="Minimize"
                aria-label="Minimize"
              >
                ▶
              </button>
            )}
          </div>
          <div className="restyld-sb-elementInfo">
            <span className="restyld-sb-tag">&lt;{tag}&gt;</span>
            {id && <span className="restyld-sb-ids"> id="{id}"</span>}
            {classes && <span className="restyld-sb-classes"> class="{classes}"</span>}
          </div>
        </header>

        <div className="restyld-sb-body">
          {/* Appearance */}
          <div className={`restyld-sb-section ${openSections.appearance ? 'restyld-sb-sectionOpen' : ''}`}>
            <button type="button" className="restyld-sb-sectionHeader" onClick={() => toggleSection('appearance')}>
              Appearance
            </button>
            <div className="restyld-sb-sectionBody">
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Background</span>
                <div className="restyld-sb-colorRow">
                  <input
                    type="color"
                    className="restyld-sb-colorInput"
                    value={s.backgroundColor?.replace(/ /g, '') || '#ffffff'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  />
                  <div className="restyld-sb-swatches">
                    {PRESET_COLORS.slice(0, 12).map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`restyld-sb-swatch ${(s.backgroundColor || '').replace(/ /g, '') === c ? 'restyld-sb-swatchActive' : ''}`}
                        style={{ background: c }}
                        onClick={() => updateStyle('backgroundColor', c)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Opacity</span>
                <div className="restyld-sb-sliderRow">
                  <input
                    type="range"
                    className="restyld-sb-slider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={parseNum(s.opacity) ?? 1}
                    onChange={(e) => updateStyle('opacity', e.target.value)}
                  />
                  <span className="restyld-sb-sliderValue">{Math.round((parseNum(s.opacity) ?? 1) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className={`restyld-sb-section ${openSections.dimensions ? 'restyld-sb-sectionOpen' : ''}`}>
            <button type="button" className="restyld-sb-sectionHeader" onClick={() => toggleSection('dimensions')}>
              Dimensions
            </button>
            <div className="restyld-sb-sectionBody">
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Width</span>
                <div className="restyld-sb-inputNumberGroup">
                  <button type="button" className="restyld-sb-stepperBtn" onClick={() => updateStyle('width', `${(parseNum(s.width) || 0) - 10}px`)}>−</button>
                  <input
                    type="text"
                    className="restyld-sb-inputNumber"
                    value={parseNum(s.width) ?? ''}
                    onChange={(e) => updateStyle('width', e.target.value ? `${e.target.value}px` : '')}
                  />
                  <button type="button" className="restyld-sb-stepperBtn" onClick={() => updateStyle('width', `${(parseNum(s.width) || 0) + 10}px`)}>+</button>
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Height</span>
                <div className="restyld-sb-inputNumberGroup">
                  <button type="button" className="restyld-sb-stepperBtn" onClick={() => updateStyle('height', `${(parseNum(s.height) || 0) - 10}px`)}>−</button>
                  <input
                    type="text"
                    className="restyld-sb-inputNumber"
                    value={parseNum(s.height) ?? ''}
                    onChange={(e) => updateStyle('height', e.target.value ? `${e.target.value}px` : '')}
                  />
                  <button type="button" className="restyld-sb-stepperBtn" onClick={() => updateStyle('height', `${(parseNum(s.height) || 0) + 10}px`)}>+</button>
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Border radius</span>
                <div className="restyld-sb-sliderRow">
                  <input
                    type="range"
                    className="restyld-sb-slider"
                    min={0}
                    max={48}
                    value={parseNum(s.borderRadius) ?? 0}
                    onChange={(e) => updateStyle('borderRadius', `${e.target.value}px`)}
                  />
                  <span className="restyld-sb-sliderValue">{parseNum(s.borderRadius) ?? 0}px</span>
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Rotation</span>
                <div className="restyld-sb-sliderRow">
                  <input
                    type="range"
                    className="restyld-sb-slider"
                    min={-180}
                    max={180}
                    value={parseNum(s.transform?.match(/rotate\((-?\d+)deg\)/)?.[1]) ?? 0}
                    onChange={(e) => updateStyle('transform', `rotate(${e.target.value}deg)`)}
                  />
                  <span className="restyld-sb-sliderValue">
                    {parseNum(s.transform?.match(/rotate\((-?\d+)deg\)/)?.[1]) ?? 0}°
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className={`restyld-sb-section ${openSections.typography ? 'restyld-sb-sectionOpen' : ''}`}>
            <button type="button" className="restyld-sb-sectionHeader" onClick={() => toggleSection('typography')}>
              Typography
            </button>
            <div className="restyld-sb-sectionBody">
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Font family</span>
                <select
                  className="restyld-sb-select"
                  value={s.fontFamily || 'inherit'}
                  onChange={(e) => updateStyle('fontFamily', e.target.value)}
                >
                  {FONT_FAMILIES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Font size</span>
                <div className="restyld-sb-inputNumberGroup">
                  <button type="button" className="restyld-sb-stepperBtn" onClick={() => updateStyle('fontSize', `${Math.max(8, (parseNum(s.fontSize) || 16) - 2)}px`)}>−</button>
                  <input
                    type="text"
                    className="restyld-sb-inputNumber"
                    value={parseNum(s.fontSize) ?? ''}
                    onChange={(e) => updateStyle('fontSize', e.target.value ? `${e.target.value}px` : '')}
                  />
                  <button type="button" className="restyld-sb-stepperBtn" onClick={() => updateStyle('fontSize', `${(parseNum(s.fontSize) || 16) + 2}px`)}>+</button>
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Font weight</span>
                <select
                  className="restyld-sb-select"
                  value={s.fontWeight || 'inherit'}
                  onChange={(e) => updateStyle('fontWeight', e.target.value)}
                >
                  <option value="inherit">Inherit</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Normal (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Color</span>
                <div className="restyld-sb-colorRow">
                  <input
                    type="color"
                    className="restyld-sb-colorInput"
                    value={(s.color || '#000000').replace(/ /g, '')}
                    onChange={(e) => updateStyle('color', e.target.value)}
                  />
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Text align</span>
                <select
                  className="restyld-sb-select"
                  value={s.textAlign || 'left'}
                  onChange={(e) => updateStyle('textAlign', e.target.value)}
                >
                  {TEXT_ALIGN.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div className={`restyld-sb-section ${openSections.spacing ? 'restyld-sb-sectionOpen' : ''}`}>
            <button type="button" className="restyld-sb-sectionHeader" onClick={() => toggleSection('spacing')}>
              Spacing
            </button>
            <div className="restyld-sb-sectionBody">
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Padding</span>
                <input
                  type="text"
                  className="restyld-sb-input"
                  placeholder="e.g. 16px or 8px 16px"
                  value={s.padding || ''}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                />
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Margin</span>
                <input
                  type="text"
                  className="restyld-sb-input"
                  placeholder="e.g. 16px or 8px 16px"
                  value={s.margin || ''}
                  onChange={(e) => updateStyle('margin', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Borders */}
          <div className={`restyld-sb-section ${openSections.borders ? 'restyld-sb-sectionOpen' : ''}`}>
            <button type="button" className="restyld-sb-sectionHeader" onClick={() => toggleSection('borders')}>
              Borders
            </button>
            <div className="restyld-sb-sectionBody">
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Style</span>
                <select
                  className="restyld-sb-select"
                  value={s.borderStyle || 'none'}
                  onChange={(e) => updateStyle('borderStyle', e.target.value)}
                >
                  {BORDER_STYLES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Width</span>
                <div className="restyld-sb-sliderRow">
                  <input
                    type="range"
                    className="restyld-sb-slider"
                    min={0}
                    max={8}
                    value={parseNum(s.borderWidth) ?? 0}
                    onChange={(e) => updateStyle('borderWidth', `${e.target.value}px`)}
                  />
                  <span className="restyld-sb-sliderValue">{parseNum(s.borderWidth) ?? 0}px</span>
                </div>
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Color</span>
                <input
                  type="color"
                  className="restyld-sb-colorInput"
                  value={(s.borderColor || '#000000').replace(/ /g, '')}
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                />
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Border radius</span>
                <div className="restyld-sb-sliderRow">
                  <input
                    type="range"
                    className="restyld-sb-slider"
                    min={0}
                    max={48}
                    value={parseNum(s.borderRadius) ?? 0}
                    onChange={(e) => updateStyle('borderRadius', `${e.target.value}px`)}
                  />
                  <span className="restyld-sb-sliderValue">{parseNum(s.borderRadius) ?? 0}px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Effects */}
          <div className={`restyld-sb-section ${openSections.effects ? 'restyld-sb-sectionOpen' : ''}`}>
            <button type="button" className="restyld-sb-sectionHeader" onClick={() => toggleSection('effects')}>
              Effects
            </button>
            <div className="restyld-sb-sectionBody">
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Box shadow</span>
                <input
                  type="text"
                  className="restyld-sb-input"
                  placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)"
                  value={s.boxShadow || ''}
                  onChange={(e) => updateStyle('boxShadow', e.target.value)}
                />
              </div>
              <div className="restyld-sb-controlRow">
                <span className="restyld-sb-label">Backdrop blur</span>
                <div className="restyld-sb-sliderRow">
                  <input
                    type="range"
                    className="restyld-sb-slider"
                    min={0}
                    max={20}
                    value={parseNum(s.backdropFilter?.match(/blur\((\d+)px\)/)?.[1]) ?? 0}
                    onChange={(e) => updateStyle('backdropFilter', e.target.value ? `blur(${e.target.value}px)` : '')}
                  />
                  <span className="restyld-sb-sliderValue">{parseNum(s.backdropFilter?.match(/blur\((\d+)px\)/)?.[1]) ?? 0}px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="restyld-sb-actions">
          <button type="button" className="restyld-sb-actionBtn restyld-sb-actionBtnSecondary" onClick={onDeselect}>
            Deselect
          </button>
          <button type="button" className="restyld-sb-actionBtn restyld-sb-actionBtnPrimary" onClick={isRepositionMode ? onRepositionDone : onReposition}>
            {isRepositionMode ? 'Done moving' : 'Reposition'}
          </button>
          <button type="button" className="restyld-sb-actionBtn restyld-sb-actionBtnDanger" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return <div className="restyld-sb-embedded">{content}</div>;
  }

  return (
    <div className="restyld-sb-sidebar" style={{ transform: `translateX(${dragOffset}px)` }}>
      {content}
    </div>
  );
}
