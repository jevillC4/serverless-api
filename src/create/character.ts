import * as yup from 'yup';

export interface Personaje {
  nombre: string;
  altura: string;
  masa: string;
  color_de_pelo: string;
  color_de_piel: string;
  color_de_ojos: string;
  anio_de_nacimiento: string;
  genero: string;
  planeta_natal: string;
  peliculas: string[];
  especies: string[];
  vehiculos: string[];
  naves_estelares: string[];
  creado: string;
  editado: string;
  url: string;
}

// Map English keys to their Spanish equivalents
export const englishToSpanishMap: { [key: string]: string } = {
  name: 'nombre',
  height: 'altura',
  mass: 'masa',
  hair_color: 'color_de_pelo',
  skin_color: 'color_de_piel',
  eye_color: 'color_de_ojos',
  birth_year: 'anio_de_nacimiento',
  gender: 'genero',
  homeworld: 'planeta_natal',
  films: 'peliculas',
  species: 'especies',
  vehicles: 'vehiculos',
  starships: 'naves_estelares',
  created: 'creado',
  edited: 'editado',
  url: 'url',
};

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const personajeSchema = yup.object().shape({
  nombre: yup.string().required('El campo "nombre" es obligatorio.'),
  altura: yup.string().required('El campo "altura" es obligatorio.'),
  masa: yup.string().required('El campo "masa" es obligatorio.'),
  color_de_pelo: yup
    .string()
    .required('El campo "color_de_pelo" es obligatorio.'),
  color_de_piel: yup
    .string()
    .required('El campo "color_de_piel" es obligatorio.'),
  color_de_ojos: yup
    .string()
    .required('El campo "color_de_ojos" es obligatorio.'),
  anio_de_nacimiento: yup
    .string()
    .required('El campo "anio_de_nacimiento" es obligatorio.'),
  genero: yup.string().required('El campo "genero" es obligatorio.'),
  planeta_natal: yup
    .string()
    .url('El campo "planeta_natal" debe ser una URL válida.')
    .required('El campo "planeta_natal" es obligatorio.'),
  peliculas: yup
    .array()
    .of(
      yup.string().url('Cada elemento de "peliculas" debe ser una URL válida.')
    )
    .required('El campo "peliculas" es obligatorio.'),
  creado: yup
    .string()
    .required('El campo "creado" es obligatorio.'),
  editado: yup
    .string()
    .required('El campo "editado" es obligatorio.'),
  url: yup
    .string()
    .url('El campo "url" debe ser una URL válida.')
    .required('El campo "url" es obligatorio.'),
});
