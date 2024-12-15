export class Page{
  #status;
  //0 for editable
  //1 for non-editable
/**
 * @param {HTMLFormElement} form - the form where we put the text
 */
  #lockFormElms(form){
    Array.from(form.elements).forEach(element => {
      element.disabled = true;
    });
  }

  #unlockFormElms(form){
    Array.from(form.elements).forEach(element => {
      element.disabled = false;
    });
  }

  edit(form_id){
    this.#status = 1;

  }

  save(form_id){
    this.#status=0;
    document.addEventListener("DOMContentLoaded",()=>{
      const form = document.getElementById(form_id);
      if(form){
        this.#unlockFormElms(form);
      }
    });
  }

  constructor(){
    this.#status = 0;
  }
}