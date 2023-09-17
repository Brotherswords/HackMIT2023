// books.js
import frankensteinThumbnail from '../assets/frankenstein.jpg';
import shakespeareThumbnail from '../assets/shakespeare.jpg';
import draculaThumbnail from '../assets/dracula.jpg';
import mobyDickThumbnail from '../assets/moby.jpg';
import pridePrejudice from '../assets/pride.jpg';

export const BOOKS = [
  { id: 1, title: 'Dracula', author: 'Bram Stoker', thumbnail: draculaThumbnail, URL: 'https://standardebooks.org/ebooks/bram-stoker/dracula/downloads/bram-stoker_dracula.epub' },
  { id: 2, title: 'Shakespeare', thumbnail: shakespeareThumbnail },
  { id: 3, title: 'Frankenstein', author: 'Mary Shelley', thumbnail: frankensteinThumbnail, URL: 'https://standardebooks.org/ebooks/mary-shelley/frankenstein/downloads/mary-shelley_frankenstein.epub' },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', thumbnail: mobyDickThumbnail, URL: 'https://standardebooks.org/ebooks/herman-melville/moby-dick/downloads/herman-melville_moby-dick.epub'},
  { id: 5, title: 'Pride & Prejudice', author: 'Jane Austen', thumbnail: pridePrejudice, URL: 'https://standardebooks.org/ebooks/jane-austen/pride-and-prejudice/downloads/jane-austen_pride-and-prejudice.epub' },
];

