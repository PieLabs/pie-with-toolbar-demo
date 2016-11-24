export const ENTRY_EVENT = 'glossary.entry';

export default class GlossaryDictionary {

  constructor(definitions){
    this._definitions = definitions;
  }

  handleEntry(event){

    let key = event.detail.entry;

    if(this._definitions[key]){
      event.detail.definition(this._definitions[key]);
    }
  } 
}

GlossaryDictionary.ENTRY_EVENT = ENTRY_EVENT;