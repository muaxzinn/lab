// 3D Molecular Coordinate Data & CPK Specifications
// Extracted from OpenLyceum MolScope / PubChem 3D Conformers & RCSB PDB (CC0 / Public Domain)

export interface Atom3D {
  position: [number, number, number];
  element: string;
  color: string;
  covalentRadius: number;
  vdwRadius: number;
}

export interface Bond3D {
  atom1: number;
  atom2: number;
  order: number;
}

export interface Molecule3D {
  id: string;
  name: string;
  thaiName: string;
  formula: string;
  molarMass: number;
  boilingPoint: string;
  geometry: string;
  description: string;
  thaiDescription: string;
  thaiSignificance: string;
  atoms: Atom3D[];
  bonds: Bond3D[];
}

export const CPK_COLORS: Record<string, string> = {
  "H": "#FFFFFF",
  "C": "#909090",
  "N": "#3050F8",
  "O": "#FF0D0D",
  "P": "#FF8000",
  "S": "#FFFF30",
  "Cl": "#1FF01F",
  "Na": "#AB5CF2",
  "K": "#8F40D4",
  "Ca": "#3DFF00"
};

export const COVALENT_RADII: Record<string, number> = {
  H: 0.31,
  C: 0.76,
  N: 0.71,
  O: 0.66,
  P: 1.07,
  S: 1.05,
  Cl: 1.02,
};

export const VDW_RADII: Record<string, number> = {
  H: 1.10,
  C: 1.70,
  N: 1.55,
  O: 1.52,
  P: 1.80,
  S: 1.80,
  Cl: 1.75,
};

export const MOLECULES_3D: Molecule3D[] = [
  {
    "id": "water",
    "name": "Water",
    "thaiName": "\u0e19\u0e49\u0e33",
    "formula": "H\u2082O",
    "molarMass": 18.015,
    "boilingPoint": "100.0 \u00b0C",
    "geometry": "Bent (104.5\u00b0)",
    "description": "Bent polar molecule essential for life on Earth.",
    "thaiDescription": "\u0e42\u0e21\u0e40\u0e25\u0e01\u0e38\u0e25\u0e21\u0e35\u0e02\u0e31\u0e49\u0e27\u0e23\u0e39\u0e1b\u0e23\u0e48\u0e32\u0e07\u0e21\u0e38\u0e21\u0e07\u0e2d (104.5\u00b0) \u0e40\u0e1b\u0e47\u0e19\u0e15\u0e31\u0e27\u0e17\u0e33\u0e25\u0e30\u0e25\u0e32\u0e22\u0e2a\u0e32\u0e01\u0e25\u0e17\u0e35\u0e48\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19\u0e15\u0e48\u0e2d\u0e17\u0e38\u0e01\u0e2a\u0e34\u0e48\u0e07\u0e21\u0e35\u0e0a\u0e35\u0e27\u0e34\u0e15",
    "thaiSignificance": "\u0e08\u0e33\u0e40\u0e1b\u0e47\u0e19\u0e15\u0e48\u0e2d\u0e0a\u0e35\u0e27\u0e40\u0e04\u0e21\u0e35\u0e17\u0e38\u0e01\u0e0a\u0e19\u0e34\u0e14 \u0e2a\u0e23\u0e49\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e30\u0e44\u0e2e\u0e42\u0e14\u0e23\u0e40\u0e08\u0e19\u0e17\u0e35\u0e48\u0e21\u0e35\u0e04\u0e27\u0e32\u0e21\u0e08\u0e38\u0e04\u0e27\u0e32\u0e21\u0e23\u0e49\u0e2d\u0e19\u0e2a\u0e39\u0e07",
    "atoms": [
      {
        "position": [
          -0.2947,
          -0.2182,
          0.1542
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.0173,
          0.6747,
          0.4086
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.3121,
          -0.4565,
          -0.5627
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 1,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 2,
        "order": 1
      }
    ]
  },
  {
    "id": "carbon-dioxide",
    "name": "Carbon Dioxide",
    "thaiName": "\u0e04\u0e32\u0e23\u0e4c\u0e1a\u0e2d\u0e19\u0e44\u0e14\u0e2d\u0e2d\u0e01\u0e44\u0e0b\u0e14\u0e4c",
    "formula": "CO\u2082",
    "molarMass": 44.01,
    "boilingPoint": "-78.5 \u00b0C (Sublimes)",
    "geometry": "Linear (180\u00b0)",
    "description": "Linear non-polar greenhouse gas used in photosynthesis.",
    "thaiDescription": "\u0e42\u0e21\u0e40\u0e25\u0e01\u0e38\u0e25\u0e44\u0e21\u0e48\u0e21\u0e35\u0e02\u0e31\u0e49\u0e27\u0e23\u0e39\u0e1b\u0e23\u0e48\u0e32\u0e07\u0e40\u0e2a\u0e49\u0e19\u0e15\u0e23\u0e07 (180\u00b0) \u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e15\u0e49\u0e19\u0e43\u0e19\u0e01\u0e23\u0e30\u0e1a\u0e27\u0e19\u0e01\u0e32\u0e23\u0e2a\u0e31\u0e07\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c\u0e14\u0e49\u0e27\u0e22\u0e41\u0e2a\u0e07",
    "thaiSignificance": "\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e2d\u0e38\u0e13\u0e2b\u0e20\u0e39\u0e21\u0e34\u0e42\u0e25\u0e01 \u0e40\u0e1b\u0e47\u0e19\u0e15\u0e31\u0e27\u0e23\u0e31\u0e1a\u0e04\u0e32\u0e23\u0e4c\u0e1a\u0e2d\u0e19\u0e43\u0e19\u0e27\u0e31\u0e0f\u0e08\u0e31\u0e01\u0e23\u0e04\u0e32\u0e23\u0e4c\u0e1a\u0e2d\u0e19\u0e0a\u0e35\u0e27\u0e20\u0e32\u0e1e",
    "atoms": [
      {
        "position": [
          -1.197,
          0.0,
          0.0
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.197,
          0.0,
          0.0
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.0,
          0.0,
          0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 2,
        "order": 2
      },
      {
        "atom1": 1,
        "atom2": 2,
        "order": 2
      }
    ]
  },
  {
    "id": "methane",
    "name": "Methane",
    "thaiName": "\u0e21\u0e35\u0e40\u0e17\u0e19",
    "formula": "CH\u2084",
    "molarMass": 16.043,
    "boilingPoint": "-161.5 \u00b0C",
    "geometry": "Tetrahedral (109.5\u00b0)",
    "description": "Tetrahedral hydrocarbon and primary component of natural gas.",
    "thaiDescription": "\u0e44\u0e2e\u0e42\u0e14\u0e23\u0e04\u0e32\u0e23\u0e4c\u0e1a\u0e2d\u0e19\u0e23\u0e39\u0e1b\u0e23\u0e48\u0e32\u0e07\u0e17\u0e23\u0e07\u0e2a\u0e35\u0e48\u0e2b\u0e19\u0e49\u0e32 (109.5\u00b0) \u0e2a\u0e48\u0e27\u0e19\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a\u0e2b\u0e25\u0e31\u0e01\u0e02\u0e2d\u0e07\u0e01\u0e4a\u0e32\u0e0b\u0e18\u0e23\u0e23\u0e21\u0e0a\u0e32\u0e15\u0e34",
    "thaiSignificance": "\u0e40\u0e0a\u0e37\u0e49\u0e2d\u0e40\u0e1e\u0e25\u0e34\u0e07\u0e2a\u0e30\u0e2d\u0e32\u0e14\u0e17\u0e35\u0e48\u0e21\u0e35\u0e2a\u0e31\u0e14\u0e2a\u0e48\u0e27\u0e19\u0e44\u0e2e\u0e42\u0e14\u0e23\u0e40\u0e08\u0e19\u0e15\u0e48\u0e2d\u0e04\u0e32\u0e23\u0e4c\u0e1a\u0e2d\u0e19\u0e2a\u0e39\u0e07\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14",
    "atoms": [
      {
        "position": [
          0.0,
          -0.0,
          0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.5541,
          0.7996,
          0.4965
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.6833,
          -0.8134,
          -0.2536
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.7782,
          -0.3735,
          0.6692
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.4593,
          0.3874,
          -0.9121
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 1,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 2,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 3,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 4,
        "order": 1
      }
    ]
  },
  {
    "id": "ethanol",
    "name": "Ethanol",
    "thaiName": "\u0e40\u0e2d\u0e17\u0e32\u0e19\u0e2d\u0e25",
    "formula": "C\u2082H\u2085OH",
    "molarMass": 46.069,
    "boilingPoint": "78.2 \u00b0C",
    "geometry": "Tetrahedral at C, Bent at O",
    "description": "Volatile alcohol with hydroxyl group forming hydrogen bonds.",
    "thaiDescription": "\u0e41\u0e2d\u0e25\u0e01\u0e2d\u0e2e\u0e2d\u0e25\u0e4c\u0e17\u0e35\u0e48\u0e40\u0e01\u0e34\u0e14\u0e1e\u0e31\u0e19\u0e18\u0e30\u0e44\u0e2e\u0e42\u0e14\u0e23\u0e40\u0e08\u0e19\u0e44\u0e14\u0e49 \u0e43\u0e0a\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e40\u0e0a\u0e37\u0e49\u0e2d\u0e40\u0e1e\u0e25\u0e34\u0e07\u0e0a\u0e35\u0e27\u0e20\u0e32\u0e1e\u0e41\u0e25\u0e30\u0e15\u0e31\u0e27\u0e17\u0e33\u0e25\u0e30\u0e25\u0e32\u0e22",
    "thaiSignificance": "\u0e43\u0e0a\u0e49\u0e43\u0e19\u0e2d\u0e38\u0e15\u0e2a\u0e32\u0e2b\u0e01\u0e23\u0e23\u0e21\u0e22\u0e32 \u0e2a\u0e32\u0e23\u0e06\u0e48\u0e32\u0e40\u0e0a\u0e37\u0e49\u0e2d\u0e42\u0e23\u0e04 \u0e41\u0e25\u0e30\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e17\u0e14\u0e41\u0e17\u0e19\u0e44\u0e1a\u0e42\u0e2d\u0e40\u0e2d\u0e17\u0e32\u0e19\u0e2d\u0e25",
    "atoms": [
      {
        "position": [
          -1.5367,
          0.3114,
          -0.0886
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.4118,
          -0.5548,
          -0.0886
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.852,
          0.2785,
          -0.0886
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.4613,
          -1.2003,
          0.7933
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.4607,
          -1.1821,
          -0.9832
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.7395,
          -0.3603,
          -0.1063
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.8771,
          0.9424,
          -0.959
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.8961,
          0.9169,
          0.8
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.4946,
          0.8481,
          0.7213
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 1,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 2,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 3,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 4,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 5,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 6,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 7,
        "order": 1
      }
    ]
  },
  {
    "id": "benzene",
    "name": "Benzene",
    "thaiName": "\u0e40\u0e1a\u0e19\u0e0b\u0e35\u0e19",
    "formula": "C\u2086H\u2086",
    "molarMass": 78.114,
    "boilingPoint": "80.1 \u00b0C",
    "geometry": "Planar Hexagonal (120\u00b0)",
    "description": "Planar aromatic ring with delocalized pi electrons.",
    "thaiDescription": "\u0e27\u0e07\u0e41\u0e2b\u0e27\u0e19\u0e41\u0e2d\u0e42\u0e23\u0e41\u0e21\u0e15\u0e34\u0e01\u0e41\u0e1a\u0e1a\u0e23\u0e30\u0e19\u0e32\u0e1a\u0e17\u0e35\u0e48\u0e21\u0e35\u0e2d\u0e34\u0e40\u0e25\u0e47\u0e01\u0e15\u0e23\u0e2d\u0e19\u0e44\u0e1e\u0e14\u0e35\u0e42\u0e25\u0e04\u0e31\u0e25\u0e44\u0e25\u0e0b\u0e4c",
    "thaiSignificance": "\u0e2a\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e15\u0e49\u0e19\u0e2a\u0e33\u0e04\u0e31\u0e0d\u0e43\u0e19\u0e01\u0e32\u0e23\u0e2a\u0e31\u0e07\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c\u0e1e\u0e2d\u0e25\u0e34\u0e40\u0e21\u0e2d\u0e23\u0e4c \u0e22\u0e32 \u0e41\u0e25\u0e30\u0e2a\u0e32\u0e23\u0e40\u0e04\u0e21\u0e35\u0e2d\u0e34\u0e19\u0e17\u0e23\u0e35\u0e22\u0e4c",
    "atoms": [
      {
        "position": [
          -1.2131,
          -0.6884,
          -0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.2028,
          0.7064,
          0.0001
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.0103,
          -1.3948,
          -0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.0104,
          1.3948,
          -0.0001
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.2028,
          -0.7063,
          -0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.2131,
          0.6884,
          -0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.1577,
          -1.2244,
          -0.0
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.1393,
          1.2564,
          0.0001
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.0184,
          -2.4809,
          -0.0001
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.0184,
          2.4808,
          -0.0
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          2.1394,
          -1.2563,
          0.0001
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          2.1577,
          1.2245,
          -0.0
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 1,
        "order": 2
      },
      {
        "atom1": 0,
        "atom2": 2,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 6,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 3,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 4,
        "order": 2
      },
      {
        "atom1": 2,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 5,
        "order": 2
      },
      {
        "atom1": 3,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 5,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 11,
        "order": 1
      }
    ]
  },
  {
    "id": "glucose",
    "name": "Glucose",
    "thaiName": "\u0e01\u0e25\u0e39\u0e42\u0e04\u0e2a",
    "formula": "C\u2086H\u2081\u2082O\u2086",
    "molarMass": 180.156,
    "boilingPoint": "146 \u00b0C (Melts)",
    "geometry": "Pyranose Ring Conformation",
    "description": "Key hexose monosaccharide fueling cellular respiration.",
    "thaiDescription": "\u0e19\u0e49\u0e33\u0e15\u0e32\u0e25\u0e42\u0e21\u0e40\u0e25\u0e01\u0e38\u0e25\u0e40\u0e14\u0e35\u0e48\u0e22\u0e27\u0e0a\u0e19\u0e34\u0e14\u0e40\u0e2e\u0e01\u0e42\u0e0b\u0e2a \u0e41\u0e2b\u0e25\u0e48\u0e07\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e1b\u0e10\u0e21\u0e20\u0e39\u0e21\u0e34\u0e43\u0e19\u0e01\u0e23\u0e30\u0e1a\u0e27\u0e19\u0e01\u0e32\u0e23\u0e2b\u0e32\u0e22\u0e43\u0e08\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e40\u0e0b\u0e25\u0e25\u0e4c",
    "thaiSignificance": "\u0e1c\u0e25\u0e34\u0e15 ATP \u0e1c\u0e48\u0e32\u0e19\u0e01\u0e23\u0e30\u0e1a\u0e27\u0e19\u0e01\u0e32\u0e23\u0e44\u0e01\u0e25\u0e42\u0e04\u0e44\u0e25\u0e0b\u0e34\u0e2a\u0e41\u0e25\u0e30\u0e27\u0e31\u0e0f\u0e08\u0e31\u0e01\u0e23\u0e40\u0e04\u0e23\u0e1a\u0e2a\u0e4c",
    "atoms": [
      {
        "position": [
          -0.5846,
          1.262,
          0.3115
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.8037,
          -2.345,
          -0.2843
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.9456,
          -1.966,
          0.5241
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.9442,
          0.6447,
          -0.4074
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.2055,
          2.7585,
          0.3119
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.2909,
          1.075,
          -0.132
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.2894,
          -1.1437,
          0.2845
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.1689,
          -0.9676,
          -0.1395
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.1378,
          0.0412,
          -0.183
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.6915,
          0.4184,
          0.2384
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.7221,
          1.5165,
          -0.1989
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.5717,
          -0.0544,
          0.3285
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.3415,
          -1.2489,
          1.3751
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.2899,
          -1.1454,
          -1.2152
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.1715,
          0.0935,
          -1.2798
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.8785,
          0.4631,
          1.3181
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.68,
          1.6174,
          -1.2895
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.6083,
          -0.0502,
          1.423
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -3.0731,
          -0.9548,
          -0.0377
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.7681,
          -2.2582,
          -1.2521
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.5806,
          -2.8323,
          0.2745
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          2.7998,
          0.6022,
          -1.3682
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.5709,
          2.6066,
          1.1993
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.8359,
          1.8685,
          0.1985
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 6,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 19,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 20,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 21,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 22,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 11,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 23,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 12,
        "order": 1
      },
      {
        "atom1": 7,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 7,
        "atom2": 13,
        "order": 1
      },
      {
        "atom1": 8,
        "atom2": 11,
        "order": 1
      },
      {
        "atom1": 8,
        "atom2": 14,
        "order": 1
      },
      {
        "atom1": 9,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 9,
        "atom2": 15,
        "order": 1
      },
      {
        "atom1": 10,
        "atom2": 16,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 17,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 18,
        "order": 1
      }
    ]
  },
  {
    "id": "caffeine",
    "name": "Caffeine",
    "thaiName": "\u0e04\u0e32\u0e40\u0e1f\u0e2d\u0e35\u0e19",
    "formula": "C\u2088H\u2081\u2080N\u2084O\u2082",
    "molarMass": 194.19,
    "boilingPoint": "178 \u00b0C (Sublimes)",
    "geometry": "Planar Fused Bicyclic",
    "description": "Purine alkaloid CNS stimulant blocking adenosine receptors.",
    "thaiDescription": "\u0e2d\u0e31\u0e25\u0e04\u0e32\u0e25\u0e2d\u0e22\u0e14\u0e4c\u0e15\u0e23\u0e30\u0e01\u0e39\u0e25\u0e1e\u0e34\u0e27\u0e23\u0e35\u0e19 \u0e2d\u0e2d\u0e01\u0e24\u0e17\u0e18\u0e34\u0e4c\u0e22\u0e31\u0e1a\u0e22\u0e31\u0e49\u0e07\u0e15\u0e31\u0e27\u0e23\u0e31\u0e1a\u0e2d\u0e30\u0e14\u0e35\u0e42\u0e19\u0e0b\u0e35\u0e19\u0e43\u0e19\u0e23\u0e30\u0e1a\u0e1a\u0e1b\u0e23\u0e30\u0e2a\u0e32\u0e17",
    "thaiSignificance": "\u0e01\u0e23\u0e30\u0e15\u0e38\u0e49\u0e19\u0e23\u0e30\u0e1a\u0e1a\u0e1b\u0e23\u0e30\u0e2a\u0e32\u0e17\u0e2a\u0e48\u0e27\u0e19\u0e01\u0e25\u0e32\u0e07\u0e41\u0e25\u0e30\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e01\u0e32\u0e23\u0e2b\u0e25\u0e31\u0e48\u0e07\u0e42\u0e14\u0e1e\u0e32\u0e21\u0e35\u0e19\u0e43\u0e19\u0e2a\u0e21\u0e2d\u0e07",
    "atoms": [
      {
        "position": [
          0.4064,
          2.5256,
          0.0003
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.1907,
          -0.4868,
          -0.0006
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -1.0322,
          -1.3557,
          -0.0003
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          2.1546,
          0.098,
          -0.0006
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.4112,
          1.0365,
          -0.0004
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          1.3483,
          -1.9804,
          -0.0001
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.7943,
          0.216,
          -0.0011
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.3261,
          -1.0696,
          -0.0007
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.0329,
          1.3788,
          -0.0009
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.9696,
          -0.2927,
          -0.0007
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.4396,
          -1.243,
          -0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.4911,
          -2.7392,
          0.0005
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          3.129,
          1.1629,
          -0.0
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.3605,
          2.1449,
          0.0004
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          3.4527,
          -1.6219,
          0.0005
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.1086,
          -3.2405,
          -0.894
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.5822,
          -2.8028,
          0.0008
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.1082,
          -3.2395,
          0.8954
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          4.1357,
          0.7369,
          -0.0001
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          2.9832,
          1.766,
          -0.8995
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          2.983,
          1.7651,
          0.9001
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.8722,
          3.1219,
          -0.0006
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.9958,
          2.0595,
          0.8878
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.9982,
          2.0589,
          -0.8852
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 8,
        "order": 2
      },
      {
        "atom1": 1,
        "atom2": 9,
        "order": 2
      },
      {
        "atom1": 2,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 11,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 6,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 12,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 13,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 10,
        "order": 2
      },
      {
        "atom1": 6,
        "atom2": 7,
        "order": 2
      },
      {
        "atom1": 6,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 10,
        "atom2": 14,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 15,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 16,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 17,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 18,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 19,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 20,
        "order": 1
      },
      {
        "atom1": 13,
        "atom2": 21,
        "order": 1
      },
      {
        "atom1": 13,
        "atom2": 22,
        "order": 1
      },
      {
        "atom1": 13,
        "atom2": 23,
        "order": 1
      }
    ]
  },
  {
    "id": "aspirin",
    "name": "Aspirin",
    "thaiName": "\u0e41\u0e2d\u0e2a\u0e44\u0e1e\u0e23\u0e34\u0e19",
    "formula": "C\u2089H\u2088O\u2084",
    "molarMass": 180.157,
    "boilingPoint": "135 \u00b0C (Melts)",
    "geometry": "Aromatic with Acetyl & Carboxyl",
    "description": "Acetylsalicylic acid NSAID inhibiting cyclooxygenase enzymes.",
    "thaiDescription": "\u0e01\u0e23\u0e14\u0e41\u0e2d\u0e0b\u0e35\u0e17\u0e34\u0e25\u0e0b\u0e32\u0e25\u0e34\u0e44\u0e0b\u0e25\u0e34\u0e01 \u0e2d\u0e2d\u0e01\u0e24\u0e17\u0e18\u0e34\u0e4c\u0e25\u0e14\u0e44\u0e02\u0e49\u0e41\u0e25\u0e30\u0e15\u0e49\u0e32\u0e19\u0e01\u0e32\u0e23\u0e2d\u0e31\u0e01\u0e40\u0e2a\u0e1a\u0e42\u0e14\u0e22\u0e22\u0e31\u0e1a\u0e22\u0e31\u0e49\u0e07\u0e40\u0e2d\u0e19\u0e44\u0e0b\u0e21\u0e4c COX",
    "thaiSignificance": "\u0e22\u0e31\u0e1a\u0e22\u0e31\u0e49\u0e07\u0e01\u0e32\u0e23\u0e23\u0e27\u0e21\u0e15\u0e31\u0e27\u0e02\u0e2d\u0e07\u0e40\u0e01\u0e25\u0e47\u0e14\u0e40\u0e25\u0e37\u0e2d\u0e14\u0e41\u0e25\u0e30\u0e25\u0e14\u0e04\u0e27\u0e32\u0e21\u0e40\u0e2a\u0e35\u0e48\u0e22\u0e07\u0e42\u0e23\u0e04\u0e2b\u0e25\u0e2d\u0e14\u0e40\u0e25\u0e37\u0e2d\u0e14\u0e2b\u0e31\u0e27\u0e43\u0e08",
    "atoms": [
      {
        "position": [
          1.1351,
          0.3986,
          0.7877
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.7934,
          -2.8702,
          -0.7417
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.6976,
          -2.3397,
          0.877
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.6831,
          0.6551,
          -1.4736
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.1839,
          0.4534,
          0.4488
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.8909,
          -0.7069,
          0.1329
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.827,
          1.691,
          0.4218
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.2408,
          -0.6295,
          -0.2099
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.1769,
          1.7684,
          0.0791
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.8837,
          0.6082,
          -0.2368
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.2391,
          -2.009,
          0.1562
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.0112,
          0.5161,
          -0.3028
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          3.4323,
          0.4442,
          0.172
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.2833,
          2.5991,
          0.6678
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.8229,
          -1.5159,
          -0.4479
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.6779,
          2.7318,
          0.0591
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -3.9356,
          0.6684,
          -0.5005
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          3.6308,
          1.263,
          0.8678
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          4.1063,
          0.5415,
          -0.6839
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          3.6123,
          -0.5213,
          0.6511
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.3537,
          -3.747,
          -0.7252
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 4,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 11,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 20,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 10,
        "order": 2
      },
      {
        "atom1": 3,
        "atom2": 11,
        "order": 2
      },
      {
        "atom1": 4,
        "atom2": 5,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 6,
        "order": 2
      },
      {
        "atom1": 5,
        "atom2": 7,
        "order": 2
      },
      {
        "atom1": 5,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 13,
        "order": 1
      },
      {
        "atom1": 7,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 7,
        "atom2": 14,
        "order": 1
      },
      {
        "atom1": 8,
        "atom2": 9,
        "order": 2
      },
      {
        "atom1": 8,
        "atom2": 15,
        "order": 1
      },
      {
        "atom1": 9,
        "atom2": 16,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 12,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 17,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 18,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 19,
        "order": 1
      }
    ]
  },
  {
    "id": "atp",
    "name": "Adenosine Triphosphate",
    "thaiName": "\u0e2d\u0e30\u0e14\u0e35\u0e42\u0e19\u0e0b\u0e35\u0e19\u0e44\u0e15\u0e23\u0e1f\u0e2d\u0e2a\u0e40\u0e1f\u0e15 (ATP)",
    "formula": "C\u2081\u2080H\u2081\u2086N\u2085O\u2081\u2083P\u2083",
    "molarMass": 507.18,
    "boilingPoint": "Decomposes",
    "geometry": "Adenosine + Triphosphate Chain",
    "description": "Primary energy currency of the cell via high-energy phosphoanhydride bonds.",
    "thaiDescription": "\u0e2a\u0e01\u0e38\u0e25\u0e40\u0e07\u0e34\u0e19\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e2a\u0e32\u0e01\u0e25\u0e02\u0e2d\u0e07\u0e40\u0e0b\u0e25\u0e25\u0e4c \u0e1b\u0e25\u0e14\u0e1b\u0e25\u0e48\u0e2d\u0e22\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e2a\u0e25\u0e32\u0e22\u0e1e\u0e31\u0e19\u0e18\u0e30\u0e1f\u0e2d\u0e2a\u0e40\u0e1f\u0e15",
    "thaiSignificance": "\u0e02\u0e31\u0e1a\u0e40\u0e04\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e1b\u0e31\u0e4a\u0e21\u0e44\u0e2d\u0e2d\u0e2d\u0e19 \u0e01\u0e32\u0e23\u0e2b\u0e14\u0e15\u0e31\u0e27\u0e02\u0e2d\u0e07\u0e01\u0e25\u0e49\u0e32\u0e21\u0e40\u0e19\u0e37\u0e49\u0e2d \u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e2a\u0e31\u0e07\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c\u0e0a\u0e35\u0e27\u0e42\u0e21\u0e40\u0e25\u0e01\u0e38\u0e25",
    "atoms": [
      {
        "position": [
          2.7778,
          -1.5133,
          -1.5686
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          4.3202,
          0.3765,
          0.0791
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          2.626,
          1.4754,
          2.23
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          -0.6665,
          -1.2054,
          1.0272
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -4.0139,
          -2.1917,
          0.1654
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -2.2245,
          -3.7944,
          1.436
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.6721,
          -1.7867,
          -0.4192
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          4.0732,
          -0.9766,
          -0.7662
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          3.228,
          -2.99,
          -2.0525
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.3237,
          -0.6096,
          -2.6779
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          3.1069,
          0.3775,
          1.1461
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          3.9166,
          1.5554,
          -0.9508
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          5.6856,
          0.5108,
          0.6861
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.129,
          2.7064,
          1.308
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.2491,
          0.8589,
          2.8094
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          3.6559,
          1.8276,
          3.2628
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -2.2875,
          0.4555,
          0.5334
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -3.2494,
          2.464,
          0.3969
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.3556,
          0.8235,
          -0.8931
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.3307,
          3.0947,
          -1.7859
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -2.0323,
          4.6966,
          -1.2703
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -2.6384,
          -1.9518,
          -0.0514
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.7717,
          -3.1612,
          0.2394
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.0781,
          -0.9348,
          0.9312
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.4088,
          -2.5287,
          0.5031
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.4349,
          -2.3903,
          -0.7564
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.4897,
          1.2044,
          -0.286
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -3.3315,
          1.2571,
          0.9167
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.1028,
          2.445,
          -0.357
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.4806,
          3.4101,
          -1.1426
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.1532,
          1.8395,
          -1.6235
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.4986,
          -1.6249,
          -1.0883
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.7699,
          -3.9107,
          -0.5572
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.5094,
          -1.0408,
          1.9344
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.1547,
          -3.0673,
          1.2734
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -0.0596,
          -1.7682,
          -1.5079
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.6284,
          -3.3755,
          -1.1927
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -4.143,
          -2.4041,
          1.1051
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -3.0794,
          -4.2123,
          1.2359
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -4.1179,
          0.9073,
          1.5716
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.0769,
          1.6309,
          -2.1491
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -2.8905,
          4.9343,
          -0.7916
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          -1.5617,
          5.3804,
          -1.8472
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          2.6641,
          -3.4719,
          -2.6944
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          4.5528,
          1.812,
          -1.6518
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          1.8659,
          3.5473,
          1.7392
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      },
      {
        "position": [
          0.797,
          1.3176,
          3.5491
        ],
        "element": "H",
        "color": "#FFFFFF",
        "covalentRadius": 0.31,
        "vdwRadius": 1.2
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 6,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 0,
        "atom2": 9,
        "order": 2
      },
      {
        "atom1": 1,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 11,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 12,
        "order": 2
      },
      {
        "atom1": 2,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 13,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 14,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 15,
        "order": 2
      },
      {
        "atom1": 3,
        "atom2": 23,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 24,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 21,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 37,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 22,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 38,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 25,
        "order": 1
      },
      {
        "atom1": 8,
        "atom2": 43,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 44,
        "order": 1
      },
      {
        "atom1": 13,
        "atom2": 45,
        "order": 1
      },
      {
        "atom1": 14,
        "atom2": 46,
        "order": 1
      },
      {
        "atom1": 16,
        "atom2": 23,
        "order": 1
      },
      {
        "atom1": 16,
        "atom2": 26,
        "order": 1
      },
      {
        "atom1": 16,
        "atom2": 27,
        "order": 1
      },
      {
        "atom1": 17,
        "atom2": 27,
        "order": 2
      },
      {
        "atom1": 17,
        "atom2": 28,
        "order": 1
      },
      {
        "atom1": 18,
        "atom2": 26,
        "order": 2
      },
      {
        "atom1": 18,
        "atom2": 30,
        "order": 1
      },
      {
        "atom1": 19,
        "atom2": 29,
        "order": 1
      },
      {
        "atom1": 19,
        "atom2": 30,
        "order": 2
      },
      {
        "atom1": 20,
        "atom2": 29,
        "order": 1
      },
      {
        "atom1": 20,
        "atom2": 41,
        "order": 1
      },
      {
        "atom1": 20,
        "atom2": 42,
        "order": 1
      },
      {
        "atom1": 21,
        "atom2": 22,
        "order": 1
      },
      {
        "atom1": 21,
        "atom2": 23,
        "order": 1
      },
      {
        "atom1": 21,
        "atom2": 31,
        "order": 1
      },
      {
        "atom1": 22,
        "atom2": 24,
        "order": 1
      },
      {
        "atom1": 22,
        "atom2": 32,
        "order": 1
      },
      {
        "atom1": 23,
        "atom2": 33,
        "order": 1
      },
      {
        "atom1": 24,
        "atom2": 25,
        "order": 1
      },
      {
        "atom1": 24,
        "atom2": 34,
        "order": 1
      },
      {
        "atom1": 25,
        "atom2": 35,
        "order": 1
      },
      {
        "atom1": 25,
        "atom2": 36,
        "order": 1
      },
      {
        "atom1": 26,
        "atom2": 28,
        "order": 1
      },
      {
        "atom1": 27,
        "atom2": 39,
        "order": 1
      },
      {
        "atom1": 28,
        "atom2": 29,
        "order": 2
      },
      {
        "atom1": 30,
        "atom2": 40,
        "order": 1
      }
    ]
  },
  {
    "id": "dna-helix",
    "name": "B-DNA Double Helix",
    "thaiName": "\u0e40\u0e01\u0e25\u0e35\u0e22\u0e27\u0e04\u0e39\u0e48\u0e14\u0e35\u0e40\u0e2d\u0e47\u0e19\u0e40\u0e2d (B-DNA Helix)",
    "formula": "Poly-nucleotide",
    "molarMass": 7200.0,
    "boilingPoint": "Denatures ~85 \u00b0C",
    "geometry": "Right-Handed Antiparallel B-Helix",
    "description": "Right-handed antiparallel double helix with Watson-Crick base pairing.",
    "thaiDescription": "\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e40\u0e01\u0e25\u0e35\u0e22\u0e27\u0e04\u0e39\u0e48\u0e40\u0e27\u0e35\u0e22\u0e19\u0e02\u0e27\u0e32\u0e2a\u0e32\u0e22\u0e04\u0e39\u0e48\u0e02\u0e19\u0e32\u0e19\u0e41\u0e1a\u0e1a\u0e15\u0e23\u0e07\u0e01\u0e31\u0e19\u0e02\u0e49\u0e32\u0e21 \u0e22\u0e36\u0e14\u0e40\u0e2b\u0e19\u0e35\u0e48\u0e22\u0e27\u0e14\u0e49\u0e27\u0e22\u0e1e\u0e31\u0e19\u0e18\u0e30\u0e44\u0e2e\u0e42\u0e14\u0e23\u0e40\u0e08\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e39\u0e48\u0e40\u0e1a\u0e2a",
    "thaiSignificance": "\u0e40\u0e01\u0e47\u0e1a\u0e23\u0e2b\u0e31\u0e2a\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e2a\u0e34\u0e48\u0e07\u0e21\u0e35\u0e0a\u0e35\u0e27\u0e34\u0e15\u0e17\u0e38\u0e01\u0e0a\u0e19\u0e34\u0e14 \u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e1c\u0e48\u0e32\u0e19\u0e01\u0e23\u0e30\u0e1a\u0e27\u0e19\u0e01\u0e32\u0e23\u0e08\u0e33\u0e25\u0e2d\u0e07\u0e15\u0e31\u0e27\u0e40\u0e2d\u0e07\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e16\u0e2d\u0e14\u0e23\u0e2b\u0e31\u0e2a",
    "atoms": [
      {
        "position": [
          0.6756,
          5.2592,
          3.4244
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.7536,
          5.1496,
          2.8652
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.086,
          4.6484,
          2.8176
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.8456,
          4.2144,
          3.1184
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.1704,
          4.43,
          2.2552
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.6416,
          4.1112,
          2.25
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.6808,
          4.0704,
          2.2364
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.794,
          3.774,
          2.7552
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.3296,
          3.4456,
          2.9296
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.3912,
          2.9628,
          3.1836
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.8456,
          2.7868,
          3.2632
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.0412,
          2.6856,
          3.3284
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.5316,
          2.8716,
          3.2256
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.9672,
          2.572,
          3.3552
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.6108,
          3.358,
          2.966
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.1612,
          3.6496,
          2.818
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.0652,
          4.0956,
          1.7708
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          2.516,
          4.444,
          1.918
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.8304,
          4.1648,
          1.2332
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.2376,
          3.4816,
          1.7768
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.5188,
          3.2512,
          2.2152
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.4992,
          2.6648,
          2.0892
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.9788,
          2.482,
          2.2472
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.5788,
          2.5112,
          1.5004
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.9908,
          2.1092,
          1.4388
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.0108,
          2.3352,
          1.344
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.79,
          2.1028,
          1.864
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.1964,
          2.1692,
          1.8896
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.912,
          2.6148,
          1.7492
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.3844,
          2.5632,
          1.832
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.3348,
          2.066,
          2.0344
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.1368,
          1.7912,
          2.1956
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.6028,
          1.9476,
          2.1848
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.0196,
          1.2928,
          2.3924
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.4752,
          1.068,
          2.4396
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.5048,
          0.5636,
          2.6448
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.9164,
          1.3252,
          2.2856
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.8176,
          1.8188,
          2.0872
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          3.1272,
          1.8296,
          0.8784
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          3.704,
          1.7076,
          0.8656
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.9252,
          2.146,
          0.4236
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.8056,
          1.2796,
          0.9084
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.9352,
          0.8952,
          1.3116
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.5108,
          0.4744,
          1.2756
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.004,
          0.7188,
          1.3588
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.4712,
          0.204,
          0.7388
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.75,
          -0.2952,
          0.7488
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.8736,
          0.1436,
          0.642
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.6128,
          0.3676,
          1.1412
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.18,
          0.7368,
          0.986
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.6652,
          0.6148,
          1.104
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.5756,
          0.186,
          1.3304
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.2756,
          0.96,
          0.9784
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.3884,
          1.4224,
          0.7364
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.01,
          1.7808,
          0.6292
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.912,
          1.5592,
          0.606
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.3164,
          1.2004,
          0.7372
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          2.8012,
          -0.654,
          0.2244
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          3.2696,
          -1.0048,
          0.2836
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.7848,
          -0.3004,
          -0.2464
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.274,
          -1.004,
          0.2456
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          2.1872,
          -1.3688,
          0.6788
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.6588,
          -1.6348,
          0.5796
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.2428,
          -1.238,
          0.576
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.6072,
          -1.9272,
          0.048
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.2152,
          -2.3332,
          0.0728
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.4188,
          -1.4716,
          -0.3072
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.988,
          -1.2584,
          0.0648
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.8236,
          -0.7064,
          -0.0748
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          1.1084,
          -0.3136,
          -0.3296
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.8268,
          0.1388,
          -0.3916
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.35,
          0.0212,
          -0.1684
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.1176,
          0.3428,
          -0.1228
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.1908,
          0.804,
          -0.2752
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.5252,
          0.0668,
          0.1184
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.5096,
          -0.4468,
          0.304
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.966,
          -0.6524,
          0.5188
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.0712,
          -0.7472,
          0.2644
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.3352,
          -0.4888,
          0.026
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          1.244,
          -2.8312,
          -0.3244
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          1.548,
          -3.2624,
          -0.0656
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          1.4364,
          -2.6496,
          -0.8584
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.6256,
          -2.9864,
          -0.358
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          0.3076,
          -2.9912,
          0.1224
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.2296,
          -2.7836,
          -0.0396
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.1616,
          -2.24,
          -0.198
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.4908,
          -3.0616,
          -0.5168
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.9936,
          -3.3004,
          -0.3744
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -0.5176,
          -2.6196,
          -0.944
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.558,
          -2.126,
          -0.5948
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.342,
          -1.6524,
          -0.8756
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          0.1648,
          -1.5776,
          -1.0696
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          0.2468,
          -1.0804,
          -1.2572
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.2292,
          -0.8376,
          -1.1832
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.4064,
          -0.3072,
          -1.2948
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.0804,
          0.07,
          -1.5152
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.912,
          -0.1876,
          -1.1752
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.2272,
          -0.558,
          -0.9548
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.1132,
          -1.062,
          -0.8288
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -0.5984,
          -1.1748,
          -0.958
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.352,
          -3.6164,
          -0.7972
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          -1.6872,
          -4.0032,
          -0.5024
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -1.0124,
          -3.8192,
          -1.2352
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -1.7468,
          -3.1744,
          -1.0304
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -2.1776,
          -2.98,
          -0.7064
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.454,
          -2.5776,
          -1.0484
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.0376,
          -2.2348,
          -1.2376
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -2.7316,
          -2.7908,
          -1.5476
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -3.2956,
          -2.6712,
          -1.55
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -2.4024,
          -2.542,
          -1.998
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.2188,
          -2.0292,
          -1.7348
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.7312,
          -1.8084,
          -1.9912
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.2524,
          -2.0592,
          -2.0752
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.8788,
          -1.7332,
          -2.28
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.132,
          -1.2584,
          -2.324
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.9492,
          -0.744,
          -2.4964
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.434,
          -0.6516,
          -2.6516
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.2988,
          -0.3424,
          -2.4816
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.7972,
          -0.434,
          -2.3136
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.0144,
          -0.8892,
          -2.1432
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.652,
          -1.2896,
          -2.1596
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -3.666,
          -2.7988,
          -2.0564
        ],
        "element": "P",
        "color": "#FF8000",
        "covalentRadius": 1.07,
        "vdwRadius": 1.8
      },
      {
        "position": [
          -4.2312,
          -2.8348,
          -1.8856
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.4584,
          -3.2612,
          -2.3676
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.6028,
          -2.264,
          -2.392
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.7356,
          -1.7648,
          -2.148
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -3.6336,
          -1.3676,
          -2.5832
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -3.0812,
          -1.3868,
          -2.7108
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.914,
          -1.5052,
          -3.104
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -4.398,
          -1.2052,
          -3.1576
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -3.4856,
          -1.408,
          -3.5332
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -3.0408,
          -1.1352,
          -3.2148
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.49,
          -1.2576,
          -3.3964
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -2.1696,
          -0.8496,
          -3.552
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -2.3452,
          -0.388,
          -3.5652
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -1.6508,
          -0.9624,
          -3.6816
        ],
        "element": "N",
        "color": "#3050F8",
        "covalentRadius": 0.71,
        "vdwRadius": 1.55
      },
      {
        "position": [
          -1.4452,
          -1.47,
          -3.6696
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -0.9664,
          -1.53,
          -3.7748
        ],
        "element": "O",
        "color": "#FF0D0D",
        "covalentRadius": 0.66,
        "vdwRadius": 1.52
      },
      {
        "position": [
          -1.786,
          -1.8888,
          -3.5284
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      },
      {
        "position": [
          -1.5908,
          -2.458,
          -3.528
        ],
        "element": "C",
        "color": "#909090",
        "covalentRadius": 0.76,
        "vdwRadius": 1.7
      }
    ],
    "bonds": [
      {
        "atom1": 0,
        "atom2": 1,
        "order": 1
      },
      {
        "atom1": 1,
        "atom2": 2,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 3,
        "order": 1
      },
      {
        "atom1": 2,
        "atom2": 4,
        "order": 1
      },
      {
        "atom1": 3,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 5,
        "order": 1
      },
      {
        "atom1": 4,
        "atom2": 6,
        "order": 1
      },
      {
        "atom1": 5,
        "atom2": 16,
        "order": 1
      },
      {
        "atom1": 6,
        "atom2": 7,
        "order": 1
      },
      {
        "atom1": 7,
        "atom2": 8,
        "order": 1
      },
      {
        "atom1": 8,
        "atom2": 9,
        "order": 1
      },
      {
        "atom1": 8,
        "atom2": 15,
        "order": 1
      },
      {
        "atom1": 9,
        "atom2": 10,
        "order": 1
      },
      {
        "atom1": 9,
        "atom2": 11,
        "order": 1
      },
      {
        "atom1": 11,
        "atom2": 12,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 13,
        "order": 1
      },
      {
        "atom1": 12,
        "atom2": 14,
        "order": 1
      },
      {
        "atom1": 14,
        "atom2": 15,
        "order": 1
      },
      {
        "atom1": 16,
        "atom2": 17,
        "order": 1
      },
      {
        "atom1": 16,
        "atom2": 18,
        "order": 1
      },
      {
        "atom1": 16,
        "atom2": 19,
        "order": 1
      },
      {
        "atom1": 19,
        "atom2": 20,
        "order": 1
      },
      {
        "atom1": 20,
        "atom2": 21,
        "order": 1
      },
      {
        "atom1": 21,
        "atom2": 22,
        "order": 1
      },
      {
        "atom1": 21,
        "atom2": 23,
        "order": 1
      },
      {
        "atom1": 22,
        "atom2": 26,
        "order": 1
      },
      {
        "atom1": 23,
        "atom2": 24,
        "order": 1
      },
      {
        "atom1": 23,
        "atom2": 25,
        "order": 1
      },
      {
        "atom1": 24,
        "atom2": 38,
        "order": 1
      },
      {
        "atom1": 25,
        "atom2": 26,
        "order": 1
      },
      {
        "atom1": 26,
        "atom2": 27,
        "order": 1
      },
      {
        "atom1": 27,
        "atom2": 28,
        "order": 1
      },
      {
        "atom1": 27,
        "atom2": 37,
        "order": 1
      },
      {
        "atom1": 28,
        "atom2": 29,
        "order": 1
      },
      {
        "atom1": 29,
        "atom2": 30,
        "order": 1
      },
      {
        "atom1": 30,
        "atom2": 31,
        "order": 1
      },
      {
        "atom1": 30,
        "atom2": 37,
        "order": 1
      },
      {
        "atom1": 31,
        "atom2": 32,
        "order": 1
      },
      {
        "atom1": 31,
        "atom2": 33,
        "order": 1
      },
      {
        "atom1": 33,
        "atom2": 34,
        "order": 1
      },
      {
        "atom1": 34,
        "atom2": 35,
        "order": 1
      },
      {
        "atom1": 34,
        "atom2": 36,
        "order": 1
      },
      {
        "atom1": 36,
        "atom2": 37,
        "order": 1
      },
      {
        "atom1": 38,
        "atom2": 39,
        "order": 1
      },
      {
        "atom1": 38,
        "atom2": 40,
        "order": 1
      },
      {
        "atom1": 38,
        "atom2": 41,
        "order": 1
      },
      {
        "atom1": 41,
        "atom2": 42,
        "order": 1
      },
      {
        "atom1": 42,
        "atom2": 43,
        "order": 1
      },
      {
        "atom1": 43,
        "atom2": 44,
        "order": 1
      },
      {
        "atom1": 43,
        "atom2": 45,
        "order": 1
      },
      {
        "atom1": 44,
        "atom2": 48,
        "order": 1
      },
      {
        "atom1": 45,
        "atom2": 46,
        "order": 1
      },
      {
        "atom1": 45,
        "atom2": 47,
        "order": 1
      },
      {
        "atom1": 46,
        "atom2": 57,
        "order": 1
      },
      {
        "atom1": 47,
        "atom2": 48,
        "order": 1
      },
      {
        "atom1": 48,
        "atom2": 49,
        "order": 1
      },
      {
        "atom1": 49,
        "atom2": 50,
        "order": 1
      },
      {
        "atom1": 49,
        "atom2": 56,
        "order": 1
      },
      {
        "atom1": 50,
        "atom2": 51,
        "order": 1
      },
      {
        "atom1": 50,
        "atom2": 52,
        "order": 1
      },
      {
        "atom1": 52,
        "atom2": 53,
        "order": 1
      },
      {
        "atom1": 53,
        "atom2": 54,
        "order": 1
      },
      {
        "atom1": 53,
        "atom2": 55,
        "order": 1
      },
      {
        "atom1": 55,
        "atom2": 56,
        "order": 1
      },
      {
        "atom1": 57,
        "atom2": 58,
        "order": 1
      },
      {
        "atom1": 57,
        "atom2": 59,
        "order": 1
      },
      {
        "atom1": 57,
        "atom2": 60,
        "order": 1
      },
      {
        "atom1": 60,
        "atom2": 61,
        "order": 1
      },
      {
        "atom1": 61,
        "atom2": 62,
        "order": 1
      },
      {
        "atom1": 62,
        "atom2": 63,
        "order": 1
      },
      {
        "atom1": 62,
        "atom2": 64,
        "order": 1
      },
      {
        "atom1": 63,
        "atom2": 67,
        "order": 1
      },
      {
        "atom1": 64,
        "atom2": 65,
        "order": 1
      },
      {
        "atom1": 64,
        "atom2": 66,
        "order": 1
      },
      {
        "atom1": 65,
        "atom2": 79,
        "order": 1
      },
      {
        "atom1": 66,
        "atom2": 67,
        "order": 1
      },
      {
        "atom1": 67,
        "atom2": 68,
        "order": 1
      },
      {
        "atom1": 68,
        "atom2": 69,
        "order": 1
      },
      {
        "atom1": 68,
        "atom2": 78,
        "order": 1
      },
      {
        "atom1": 69,
        "atom2": 70,
        "order": 1
      },
      {
        "atom1": 70,
        "atom2": 71,
        "order": 1
      },
      {
        "atom1": 71,
        "atom2": 72,
        "order": 1
      },
      {
        "atom1": 71,
        "atom2": 78,
        "order": 1
      },
      {
        "atom1": 72,
        "atom2": 73,
        "order": 1
      },
      {
        "atom1": 72,
        "atom2": 74,
        "order": 1
      },
      {
        "atom1": 74,
        "atom2": 75,
        "order": 1
      },
      {
        "atom1": 75,
        "atom2": 76,
        "order": 1
      },
      {
        "atom1": 75,
        "atom2": 77,
        "order": 1
      },
      {
        "atom1": 77,
        "atom2": 78,
        "order": 1
      },
      {
        "atom1": 79,
        "atom2": 80,
        "order": 1
      },
      {
        "atom1": 79,
        "atom2": 81,
        "order": 1
      },
      {
        "atom1": 79,
        "atom2": 82,
        "order": 1
      },
      {
        "atom1": 82,
        "atom2": 83,
        "order": 1
      },
      {
        "atom1": 83,
        "atom2": 84,
        "order": 1
      },
      {
        "atom1": 84,
        "atom2": 85,
        "order": 1
      },
      {
        "atom1": 84,
        "atom2": 86,
        "order": 1
      },
      {
        "atom1": 85,
        "atom2": 89,
        "order": 1
      },
      {
        "atom1": 86,
        "atom2": 87,
        "order": 1
      },
      {
        "atom1": 86,
        "atom2": 88,
        "order": 1
      },
      {
        "atom1": 87,
        "atom2": 100,
        "order": 1
      },
      {
        "atom1": 88,
        "atom2": 89,
        "order": 1
      },
      {
        "atom1": 89,
        "atom2": 90,
        "order": 1
      },
      {
        "atom1": 90,
        "atom2": 91,
        "order": 1
      },
      {
        "atom1": 90,
        "atom2": 99,
        "order": 1
      },
      {
        "atom1": 91,
        "atom2": 92,
        "order": 1
      },
      {
        "atom1": 92,
        "atom2": 93,
        "order": 1
      },
      {
        "atom1": 93,
        "atom2": 94,
        "order": 1
      },
      {
        "atom1": 93,
        "atom2": 99,
        "order": 1
      },
      {
        "atom1": 94,
        "atom2": 95,
        "order": 1
      },
      {
        "atom1": 94,
        "atom2": 96,
        "order": 1
      },
      {
        "atom1": 96,
        "atom2": 97,
        "order": 1
      },
      {
        "atom1": 97,
        "atom2": 98,
        "order": 1
      },
      {
        "atom1": 98,
        "atom2": 99,
        "order": 1
      },
      {
        "atom1": 100,
        "atom2": 101,
        "order": 1
      },
      {
        "atom1": 100,
        "atom2": 102,
        "order": 1
      },
      {
        "atom1": 100,
        "atom2": 103,
        "order": 1
      },
      {
        "atom1": 103,
        "atom2": 104,
        "order": 1
      },
      {
        "atom1": 104,
        "atom2": 105,
        "order": 1
      },
      {
        "atom1": 105,
        "atom2": 106,
        "order": 1
      },
      {
        "atom1": 105,
        "atom2": 107,
        "order": 1
      },
      {
        "atom1": 106,
        "atom2": 110,
        "order": 1
      },
      {
        "atom1": 107,
        "atom2": 108,
        "order": 1
      },
      {
        "atom1": 107,
        "atom2": 109,
        "order": 1
      },
      {
        "atom1": 108,
        "atom2": 121,
        "order": 1
      },
      {
        "atom1": 109,
        "atom2": 110,
        "order": 1
      },
      {
        "atom1": 110,
        "atom2": 111,
        "order": 1
      },
      {
        "atom1": 111,
        "atom2": 112,
        "order": 1
      },
      {
        "atom1": 111,
        "atom2": 120,
        "order": 1
      },
      {
        "atom1": 112,
        "atom2": 113,
        "order": 1
      },
      {
        "atom1": 113,
        "atom2": 114,
        "order": 1
      },
      {
        "atom1": 114,
        "atom2": 115,
        "order": 1
      },
      {
        "atom1": 114,
        "atom2": 120,
        "order": 1
      },
      {
        "atom1": 115,
        "atom2": 116,
        "order": 1
      },
      {
        "atom1": 115,
        "atom2": 117,
        "order": 1
      },
      {
        "atom1": 117,
        "atom2": 118,
        "order": 1
      },
      {
        "atom1": 118,
        "atom2": 119,
        "order": 1
      },
      {
        "atom1": 119,
        "atom2": 120,
        "order": 1
      },
      {
        "atom1": 121,
        "atom2": 122,
        "order": 1
      },
      {
        "atom1": 121,
        "atom2": 123,
        "order": 1
      },
      {
        "atom1": 121,
        "atom2": 124,
        "order": 1
      },
      {
        "atom1": 124,
        "atom2": 125,
        "order": 1
      },
      {
        "atom1": 125,
        "atom2": 126,
        "order": 1
      },
      {
        "atom1": 126,
        "atom2": 127,
        "order": 1
      },
      {
        "atom1": 126,
        "atom2": 128,
        "order": 1
      },
      {
        "atom1": 127,
        "atom2": 131,
        "order": 1
      },
      {
        "atom1": 128,
        "atom2": 129,
        "order": 1
      },
      {
        "atom1": 128,
        "atom2": 130,
        "order": 1
      },
      {
        "atom1": 130,
        "atom2": 131,
        "order": 1
      },
      {
        "atom1": 131,
        "atom2": 132,
        "order": 1
      },
      {
        "atom1": 132,
        "atom2": 133,
        "order": 1
      },
      {
        "atom1": 133,
        "atom2": 134,
        "order": 1
      },
      {
        "atom1": 133,
        "atom2": 135,
        "order": 1
      },
      {
        "atom1": 135,
        "atom2": 136,
        "order": 1
      },
      {
        "atom1": 136,
        "atom2": 137,
        "order": 1
      },
      {
        "atom1": 136,
        "atom2": 138,
        "order": 1
      },
      {
        "atom1": 138,
        "atom2": 139,
        "order": 1
      }
    ]
  }
];
