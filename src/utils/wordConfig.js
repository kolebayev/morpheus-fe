// http://opencorpora.org/dict.php?act=gram

const wordConfig = {
  post: [
    { label: 'существительное', value: 'NOUN' },
    { label: 'прилагательное', value: 'ADJF' },
    { label: 'глагол', value: 'VERB' },
    { label: 'местоимение', value: 'NPRO' },
    { label: 'числительное', value: 'NUMR' },
    { label: 'наречие', value: 'ADVB' },
    { label: 'неважно', value: null },
  ],
  NMbr: [
    { label: 'неважно', value: null },
    { label: 'единственное', value: 'sing' },
    { label: 'множественное', value: 'plur' },
  ],
  GNdr: [
    { label: 'неважно', value: null },
    { label: 'мужской', value: 'masc' },
    { label: 'женский', value: 'femn' },
    { label: 'средний', value: 'neut' },
  ],
}

export default wordConfig
