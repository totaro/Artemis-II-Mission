export interface MissionCapture {
  id: string;
  title: string; // Use \n for line breaks
  description: string;
  date: string;
  photographer: string;
  nasaId?: string;
  credit?: string;
  imageUrl: string;
  imageAlt: string;
  imageLabel: string;
  imageLabelPosition?: 'bottom-right' | 'bottom-left';
}

export const missionCaptures: MissionCapture[] = [
  {
    id: 'capture-1',
    title: 'Earth in the\nRear-View',
    description: 'A view of Earth taken by NASA astronaut and Artemis II Commander Reid Wiseman from one of the Orion spacecraft\'s windows after completing the translunar injection burn on April 2, 2026. The image features two auroras and zodiacal light as the Earth eclipses the Sun.',
    date: 'April 2, 2026',
    photographer: 'Reid Wiseman',
    nasaId: 'art002e000192',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e000192/art002e000192~large.jpg',
    imageAlt: 'Earth From the Perspective of Artemis II',
    imageLabel: 'Orion Cabin Window',
    imageLabelPosition: 'bottom-right'
  },
  {
    id: 'capture-2',
    title: 'Orion\nSelfie',
    description: 'Orion snapped this high-resolution selfie in space with a camera mounted on one of its solar array wings during a routine external inspection of the spacecraft on the second day into the Artemis II mission.',
    date: 'April 3, 2026',
    photographer: 'NASA',
    nasaId: 'art002e004357',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e004357/art002e004357~large.jpg',
    imageAlt: 'Orion Snaps a Selfie During External Inspection',
    imageLabel: 'Solar Array Camera',
    imageLabelPosition: 'bottom-right'
  },
  {
    id: 'capture-3',
    title: 'History in\nthe Making',
    description: 'The Artemis II crew took this photo on day 4 of their journey to the Moon. In it, the Moon is oriented with the South Pole at the top and we are beginning to see parts of the lunar far side. Orientale basin is on the right edge of the lunar disk in this image. Artemis II marks the first time that humans have seen the entire basin.',
    date: 'April 4, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'art002e009006',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e009006/art002e009006~large.jpg',
    imageAlt: 'The Moon From the Perspective of Artemis II',
    imageLabel: 'Lunar Far Side',
    imageLabelPosition: 'bottom-right'
  },
  {
    id: 'capture-4',
    title: 'Farther Into\nSpace',
    description: 'The Orion Spacecraft, the Earth and the Moon are seen from a camera as the Artemis II crew and spacecraft travel farther into Space.',
    date: 'April 6, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'orion_earth_moon_20221121',
    imageUrl: 'https://images-assets.nasa.gov/image/orion_earth_moon_20221121/orion_earth_moon_20221121~large.jpg',
    imageAlt: 'Earth behind the Moon from Orion',
    imageLabel: 'Solar Array Camera',
    imageLabelPosition: 'bottom-left'
  },
  {
    id: 'capture-5',
    title: 'Orientale\nBasin',
    description: 'This striking high-resolution image was captured on April 6, 2026, as Orion swung around the Moon, reaching its closest approach at 7:00 p.m. EDT. During this maneuver, the spacecraft reached a record-breaking distance of approximately 406,771 km (252,756 miles) from Earth. It reveals the Orientale Basin (the dark patch on the left), a massive impact crater that straddles the boundary between the near and far sides, alongside ancient lava flows. In this view, the near side is visible on the right, while the rugged terrain of the lunar far side dominates the left.',
    date: 'April 6, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'art001e000265',
    imageUrl: 'https://images-assets.nasa.gov/image/art001e000265/art001e000265~large.jpg',
    imageAlt: 'View of the Lunar Far Side and Orientale Basin',
    imageLabel: 'Lunar Far Side',
    imageLabelPosition: 'bottom-right'
  },
  {
    id: 'capture-6',
    title: 'Earthset\nOver the Moon',
    description: 'Earth sets over the Moon’s curved limb in this photo captured by the Artemis II crew during their journey around the far side of the Moon. Orientale basin is perched on the edge of the visible lunar surface. Hertzsprung Basin appears as two subtle concentric rings, which are interrupted by Vavilov, a younger crater superimposed over the older structure.',
    date: 'April 6, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'art002e009287',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e009287/art002e009287~large.jpg',
    imageAlt: 'Earth setting over the Moon\'s curved limb',
    imageLabel: 'Lunar Far Side',
    imageLabelPosition: 'bottom-left'
  },
  {
    id: 'capture-7',
    title: 'Earthset\nThrough the Window',
    description: 'Earthset captured through the Orion spacecraft window at 6:41 p.m. EDT, April 6, 2026, during the Artemis II crew’s flyby of the Moon. A muted blue Earth with bright white clouds sets behind the cratered lunar surface. In the foreground, Ohm crater has terraced edges and a flat floor interrupted by central peaks.',
    date: 'April 6, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'art002e009288',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e009288/art002e009288~large.jpg',
    imageAlt: 'Earthset captured through the Orion spacecraft window',
    imageLabel: 'Orion Cabin Window',
    imageLabelPosition: 'bottom-right'
  },
  {
    id: 'capture-8',
    title: 'Ready for a\nClose Up',
    description: 'Captured by the Artemis II crew, the heavily cratered terrain of the eastern edge of the South Pole-Aitken basin is seen with the shadowed terminator – the boundary between lunar day and night – at the top of the image. The South Pole-Aitken basin is the largest and oldest basin on the Moon, providing a glimpse into an ancient geologic history built up over billions of years.',
    date: 'April 6, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'art002e009283',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e009283/art002e009283~large.jpg',
    imageAlt: 'Close up of the heavily cratered terrain of the eastern edge of the South Pole-Aitken basin',
    imageLabel: 'Lunar Surface',
    imageLabelPosition: 'bottom-left'
  },
  {
    id: 'capture-9',
    title: 'Artemis II\nin Eclipse',
    description: 'Captured by the Artemis II crew during their lunar flyby on April 6, 2026, this image shows the Moon fully eclipsing the Sun. From the crew’s perspective, the Moon appears large enough to completely block the Sun, creating nearly 54 minutes of totality and extending the view far beyond what is possible from Earth. We see a glowing halo around the dark lunar disk. The faint glow of the nearside of the Moon is visible in this image, having been illuminated by light reflected off the Earth.',
    date: 'April 6, 2026',
    photographer: 'Artemis II Crew',
    nasaId: 'art002e009301',
    imageUrl: 'https://images-assets.nasa.gov/image/art002e009301/art002e009301~large.jpg',
    imageAlt: 'The Moon fully eclipsing the Sun during the Artemis II lunar flyby',
    imageLabel: 'Solar Eclipse',
    imageLabelPosition: 'bottom-right'
  }
];
