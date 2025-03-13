import { getPlaiceholder } from 'plaiceholder';

export const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()));

  const {
    metadata: { height, width },
    ...data
  } = await getPlaiceholder(buffer);

  return { img: { src, height, width }, ...data };
};

export const getImages = async (srcArr: string[]) => {
  const images: { img: { src: string; width: number; height: number }; base64: string }[] = [];
  for (const i of srcArr) {
    const buffer = await fetch(i).then(async res => Buffer.from(await res.arrayBuffer()));
    const {
      metadata: { height, width },
      base64,
    } = await getPlaiceholder(buffer);
    images.push({ img: { src: i, width, height }, base64 });
  }
  return images;
};

// export const getCategoriesWithPlaceholder = async (categories: Category[]) => {
//   const categoriesWithPlaceholder: ICategoriesWithPlaceholder[] = [];
//   for (const c of categories) {
//     const placeholder = await getImage(c.imageUrl);
//     categoriesWithPlaceholder.push({ ...c, img: { width: placeholder.img.width, height: placeholder.img.height, base64: placeholder.base64 } });
//   }
//   return categoriesWithPlaceholder;
// };
