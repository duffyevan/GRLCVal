
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Soup = imports.gi.Soup;
const Lang = imports.lang;
const Mainloop = imports.mainloop;



let button, label;
let test = 0;
let url = "https://api.coinmarketcap.com/v1/ticker/garlicoin/"

function refresh(){
    test++;
    let httpSession = new Soup.Session();

    let message = Soup.form_request_new_from_hash('GET', url, []); // get the url, no params

    let jp = "";
    httpSession.queue_message(message, Lang.bind(this, function(httpSession, me) {
        try {
            jp = JSON.parse(me.response_body.data)[0];

            label = new St.Label({text: "GRLC: $" + jp.price_usd});
            button.set_child(label);

        } catch (e) {
            // Main.notifyError(_("There Was An Error Loading Data"), e.message); // Yeah fuck this it kept giving me dropdown notifications about this. Just Ignore Errors lol
        }
    }));

    Mainloop.timeout_add(60000, refresh);
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });

    refresh();
    button.connect('button-press-event', refresh);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
