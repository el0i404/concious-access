export type CSSAbsoluteLengthUnits = 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'px';

export type CSSRelativeLengthUnits =
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'lh'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | '%';

export type CSSLengthUnits = CSSAbsoluteLengthUnits & CSSRelativeLengthUnits;
