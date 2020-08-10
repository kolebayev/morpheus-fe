// http://opencorpora.org/dict.php?act=gram

const posConfig = {
  post: [
    { label: "существительное", value: "NOUN" },
    { label: "прилагательное", value: "ADJF" },
    { label: "глагол", value: "VERB" },
    { label: "местоимение", value: "NPRO" },
    { label: "числительное", value: "NUMR" },
    { label: "наречие", value: "ADVB" },
  ],
  NMbr: [
    { label: "единственное", value: "sing" },
    { label: "множественное", value: "plur" },
  ],
  GNdr: [
    { label: "мужской", value: "masc" },
    { label: "женский", value: "femn" },
    { label: "средний", value: "neut" },
  ],
};

export default posConfig;
