// books.js
import frankensteinThumbnail from '../assets/frankenstein.jpg';
import shakespeareThumbnail from '../assets/shakespeare.jpg';
import draculaThumbnail from '../assets/dracula.jpg';
import mobyDickThumbnail from '../assets/moby.jpg';
import pridePrejudice from '../assets/pride.jpg';
import marcusAurelius from '../assets/Marcus Aurelius.jpg';
import athenianConstitution from '../assets/athenianConstitution.jpg';
import holidayStories from '../assets/holiday.jpg';
import spaceTime from '../assets/space.jpg';
import polar from '../assets/polar.jpg';
import pomegranates from '../assets/pomegran.jpg';
import guideToModernCookery from '../assets/guide.jpg';
import christMas from '../assets/christmas.jpg'


export const BOOKS = [
  { id: 1, title: 'Dracula', author: 'Bram Stoker', thumbnail: draculaThumbnail, URL: 'https://standardebooks.org/ebooks/bram-stoker/dracula/downloads/bram-stoker_dracula.epub' },
  { id: 2, title: 'Shakespeare', thumbnail: shakespeareThumbnail },
  { id: 3, title: 'Frankenstein', author: 'Mary Shelley', thumbnail: frankensteinThumbnail, URL: 'https://standardebooks.org/ebooks/mary-shelley/frankenstein/downloads/mary-shelley_frankenstein.epub' },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', thumbnail: mobyDickThumbnail, URL: 'https://standardebooks.org/ebooks/herman-melville/moby-dick/downloads/herman-melville_moby-dick.epub'},
  { id: 5, title: 'Pride & Prejudice', author: 'Jane Austen', thumbnail: pridePrejudice, URL: 'https://standardebooks.org/ebooks/jane-austen/pride-and-prejudice/downloads/jane-austen_pride-and-prejudice.epub' },
  {id: 6, title: 'Marcus Aurelius', thumbnail: marcusAurelius},
  {id: 7, title: 'Athenian Constitution', thumbnail: athenianConstitution},
  {id: 8, title: 'Holiday Stories', thumbnail: holidayStories},
  {id: 9, title: 'Tales of Space & Time', thumbnail: spaceTime},
  {id: 12, title: 'Our Polar Flight', thumbnail: polar},
  {id: 13, title: 'A House of Pomegranates', thumbnail: pomegranates},
  {id: 14, title: 'A Guide to Modern Cookery', thumbnail: guideToModernCookery},
  {id: 15, title: 'The Childrens Book of Christmas', thumbnail: christMas}
];

