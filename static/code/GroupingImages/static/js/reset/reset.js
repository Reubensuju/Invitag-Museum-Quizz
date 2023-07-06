/*JS to Reset and Remove All Groups*/

//Event every time reset button is clicked
document.querySelector('#reset').addEventListener('click', () => {
    RConfirm.open({
      title: 'Reset',
      message: 'Are you sure you wish to Reset All Groups?',
      onok: () => {
          /*This Function is where we can add the code for reset of all groups
          Currently it is set to changing backgroundColor to blue just to test if the function works when we click confirm*/
        document.body.style.backgroundColor = 'blue';
      }
    })
  });

const RConfirm = {
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
            <div class="reset-confirm">
                <div class="reset-confirm__window">
                    <div class="reset-confirm__titlebar">
                        <span class="reset-confirm__title">${options.title}</span>
                        <button class="reset-confirm__close">&times;</button>
                    </div>
                    <div class="reset-confirm__content">${options.message}</div>
                    <div class="reset-confirm__buttons">
                        <button class="reset-confirm__button reset-confirm__button--ok reset-confirm__button--fill">${options.okText}</button>
                        <button class="reset-confirm__button reset-confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const RconfirmEl = template.content.querySelector('.reset-confirm');
        const RbtnClose = template.content.querySelector('.reset-confirm__close');
        const RbtnOk = template.content.querySelector('.reset-confirm__button--ok');
        const RbtnCancel = template.content.querySelector('.reset-confirm__button--cancel');

        RconfirmEl.addEventListener('click', e => {
            if (e.target === RconfirmEl) {
                options.oncancel();
                this._close(RconfirmEl);
            }
        });

        RbtnOk.addEventListener('click', () => {
            options.onok();
            this._close(RconfirmEl);
        });

        [RbtnCancel, RbtnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(RconfirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    //Code to close popup
    _close (RconfirmEl) {
        RconfirmEl.classList.add('reset-confirm--close');

        RconfirmEl.addEventListener('animationend', () => {
            document.body.removeChild(RconfirmEl);
        });
    }
};


