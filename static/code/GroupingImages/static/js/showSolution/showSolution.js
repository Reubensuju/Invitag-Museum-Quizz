/*JS to Show the Solution*/

//Event every time showSolution button is clicked
document.querySelector('#showSolution').addEventListener('click', () => {
    SConfirm.open({
      title: 'Show Solution',
      message: 'Are you sure you wish to see the Solution?',
      onok: () => {
          /*This Function is where we can add the code for showSolution of all groups
          Currently it is set to changing backgroundColor to red just to test if the function works when we click confirm*/
        document.body.style.backgroundColor = 'red';
      }
    })
  });

const SConfirm = {
    //Code to open the popup
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'OK',
            cancelText: 'Cancel',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        //HTML for the popup
        const html = `
            <div class="showSol-confirm">
                <div class="showSol-confirm__window">
                    <div class="showSol-confirm__titlebar">
                        <span class="showSol-confirm__title">${options.title}</span>
                        <button class="showSol-confirm__close">&times;</button>
                    </div>
                    <div class="showSol-confirm__content">${options.message}</div>
                    <div class="showSol-confirm__buttons">
                        <button class="showSol-confirm__button showSol-confirm__button--ok showSol-confirm__button--fill">${options.okText}</button>
                        <button class="showSol-confirm__button showSol-confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const SconfirmEl = template.content.querySelector('.showSol-confirm');
        const SbtnClose = template.content.querySelector('.showSol-confirm__close');
        const SbtnOk = template.content.querySelector('.showSol-confirm__button--ok');
        const SbtnCancel = template.content.querySelector('.showSol-confirm__button--cancel');

        SconfirmEl.addEventListener('click', e => {
            if (e.target === SconfirmEl) {
                options.oncancel();
                this._close(SconfirmEl);
            }
        });

        SbtnOk.addEventListener('click', () => {
            options.onok();
            this._close(SconfirmEl);
        });

        [SbtnCancel, SbtnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(SconfirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    //Code to close popup
    _close (SconfirmEl) {
        SconfirmEl.classList.add('showSol-confirm--close');

        SconfirmEl.addEventListener('animationend', () => {
            document.body.removeChild(SconfirmEl);
        });
    }
};