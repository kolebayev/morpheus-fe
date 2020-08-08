const requestConfig = {
  pos: [
    { label: "существительное", value: "NOUN" },
    { label: "прилагательное", value: "ADJF" },
    { label: "глагол", value: "VERB" },
    { label: "местоимение", value: "NPRO" },
    { label: "числительное", value: "NUMR" },
    { label: "наречие", value: "ADVB" },
  ],
  number: [
    { label: "единственное", value: "sing" },
    { label: "множественное", value: "plur" },
  ],
  gender: [
    { label: "мужской", value: "masc" },
    { label: "женский", value: "femn" },
    { label: "средний", value: "neut" },
  ],
};

export default requestConfig;
