const createDocumentForm = (array,rsd) => {
 
  let doc_ar = [];
  let code;
  let doc;
  for (let i = 0; i < array.length; i++) {
    code = array[i].split("\t")[0].split(":")[1];
    doc = array[i].split("\t")[3]?.split(":")[0];
    if (array[i].split("\t")[0].includes("Entity") && doc.includes(rsd)) {
      doc_ar.push(doc);
    }
  }

  doc_ar = [...new Set(doc_ar)];

  doc_ar = doc_ar.sort().map((v) => {
    return { doc: v, entities: [], relations: [], events: [] };
  });

  return doc_ar;
};


const createDocumentEntity = (array, doc , num) =>{
  let code
  let type
  let sentence

  for (let i = 0; i < array.length; i++) {
    if (array[i].split('\t')[0].includes("Entity")) {
      code = array[i].split('\t')[0];

      type = array[i].split('\t')[1];

      sentence = array[i].split('\t')[2];

      if (type === 'type' && array[i - 1].split('\t')[0] !== code) {
        do {
          num++;
        } while (array[i + num].split('\t')[0] === code);
        let ar_length
        for (let index = 1; index < num; index++) {
          if (array[i + index].split('\t')[1] === 'type') {
            continue;
          }
          if (array[i + index].split('\t')[1] === 'canonical_mention') {
            ar_length = doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].entities.push({
              code: code.split(':')[1],
              name: array[i + index].split('"')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
              type: sentence.split('#')[1],
              ref: [],
            });
          } else if (
            array[i + index].split('\t')[1] === 'nominal_mention' &&
            array[i + index].split('"')[1] !==
              array[i + index - 1].split('"')[1]
          ) {
            doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].entities[ar_length - 1].ref.push({
              type: 'nominal',
              name: array[i + index].split('"')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
            });
          } else if (
            array[i + index].split('\t')[1] === 'pronominal_mention'
          ) {
            doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].entities[ar_length - 1].ref.push({
              type: 'pronominal',
              name: array[i + index].split('"')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
            });
          }else if(array[i + index].split('\t')[1] === 'mention' && array[i + index].split('"')[1] !==
          array[i+index -1].split('"')[1]){
            doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].entities[ar_length - 1].ref.push({
              type: 'mention',
              name: array[i + index].split('"')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
            });
          }
        }
      }

      num = 0;
    }
  }

}

const createDocumentRelation = (array, doc, num) =>{
  let code
  let type
  let sentence

  for (let i = 0; i < array.length; i++) {
    if (array[i].split('\t')[0].includes("Relation")) {
      code = array[i].split('\t')[0];

      type = array[i].split('\t')[1];

      sentence = array[i].split('\t')[2];

      if (type === 'type' && array[i - 1].split('\t')[0] !== code) {
        do {
          num++;
        } while (array[i + num].split('\t')[0] === code);
        let ar_length

        for (let index = 1; index < num; index++) {
          if (
            array[i + index].split('\t')[1] === 'canonical_mention.actual'
          ) {
            ar_length = doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].relations.push({
              type: sentence.split('#')[1],
              code: code.split(':')[1],
              // text: array[i + index].split('"')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
              ref: [],
            });
          } else if (array[i + index].split('\t')[1].includes('https://')) {
            doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].relations[ar_length - 1].ref.push({
              type: array[i + index].split('\t')[1].split('#')[1],
              code: array[i + index].split('\t')[2].split(':')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
            });
          }
        }
      }
    }
    num = 0;
  }

}

const createDocumentEvent = (array, doc, num) =>{
  let code
  let type
  let sentence

  for (let i = 0; i < array.length; i++) {
    if (array[i].split('\t')[0].includes("Event")) {
      code = array[i].split('\t')[0];

      type = array[i].split('\t')[1];

      sentence = array[i].split('\t')[2];

      if (type === 'type' && array[i - 1].split('\t')[0] !== code) {
        do {
          num++;
        } while (array[i + num].split('\t')[0] === code);
        let ar_length;
        for (let index = 1; index < num; index++) {
          if (
            array[i + index].split('\t')[1] === 'canonical_mention.actual'
          ) {
            ar_length = doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].events.push({
              type: sentence.split('#')[1],
              code: code.split(':')[1],
              name: array[i + index].split('"')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
              ref: [],
            });
          } else if (array[i + index].split('\t')[1].includes('https://')) {
            doc[
              doc.findIndex(
                (v) =>
                  v.doc === array[i + index].split('\t')[3].split(':')[0],
              )
            ].events[ar_length - 1].ref.push({
              type: array[i + index].split('\t')[1].split('#')[1],
              code: array[i + index].split('\t')[2].split(':')[1],
              loc: array[i + index].split('\t')[3].split(':')[1],
            });
          }
        }
      }

      num = 0;
    }
  }

}

export const createDocumentData = (data,rsd) =>{

      let num = 0;
      const data_array = data.split('\n');

      const doc_ar = createDocumentForm(data_array,rsd);
   

     createDocumentEntity(data_array, doc_ar, num);
    createDocumentRelation(data_array, doc_ar, num);
     createDocumentEvent(data_array, doc_ar, num);

     

      return doc_ar;


}