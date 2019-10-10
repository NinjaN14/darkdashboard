//client.pointsTirar // da DBL
const url = require('url');
const path = require('path');
const fs = require('fs');


const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
const cF = require('currency-formatter');

const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session');
const Strategy = require('passport-discord').Strategy;

const md = require('marked');

const morgan = require('morgan');

const moment = require('moment');
require('moment-duration-format');

module.exports = (client) => {

  client.db = require('quick.db');

  //const DBL = require("dblapi.js");
  //const dbl = new DBL(process.env.DBLTOKEN, client);

	if (client.config.dashboard.enabled !== 'true') return client.log('LOG', 'Dashboard está desativada', 'INFO');

	const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

	const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

	app.set('trust proxy', 5);

	app.use('/public', express.static(path.resolve(`${dataDir}${path.sep}public`), { maxAge: '10h' }));
  app.use('/content', express.static(path.resolve(`${dataDir}${path.sep}content`), { maxAge: '10h' }));
	app.use(morgan('combined'));

	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});

	var protocol;

	if (client.config.dashboard.secure === 'true') {
		client.protocol = 'https://';
	} else {
		client.protocol = 'http://';
	}

	protocol = client.protocol;

	if (client.config.dashboard.secure === 'true') {
		client.protocol = 'https://';
	} else {
		client.protocol = 'http://';
	}

	protocol = client.protocol;

	client.callbackURL = `https://darkdashboard.glitch.me/callback`;
	client.log('log', `Callback URL: ${client.callbackURL}`, 'INFO');
	passport.use(new Strategy({
		clientID: client.appInfo.id,
		clientSecret: client.config.dashboard.oauthSecret,
		callbackURL: client.callbackURL,
		scope: ['identify', 'guilds', 'email', 'connections']
	},
	(accessToken, refreshToken, profile, done) => {
		process.nextTick(() => done(null, profile));
	}))

app.use(session({
		secret: client.config.dashboard.sessionSecret,
		resave: true,
		saveUninitialized: false,
	}));

	// Initializes passport and session.
	app.use(passport.initialize());
	app.use(passport.session());

	// The domain name used in various endpoints to link between pages.
	app.locals.domain = client.config.dashboard.domain;

	// The EJS templating engine gives us more power
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	// body-parser reads incoming JSON or FORM data and simplifies their
	// use in code.
	var bodyParser = require('body-parser');
	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));

	function checkAuth(req, res, next) {
		if (req.isAuthenticated()) return next();
		req.session.backURL = req.url;
		res.redirect('/login');
	}

	function cAuth(req, res) {
		if (req.isAuthenticated()) return;
		req.session.backURL = req.url;
		res.redirect('/login');
	}

	function checkAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.id === client.config.ownerID) return next();
		req.session.backURL = req.originalURL;
		res.redirect('/');
	}

	var privacyMD = '';
	fs.readFile(`${process.cwd()}${path.sep}dashboard${path.sep}public${path.sep}PRIVACY.md`, function(err, data) {
		if (err) {
			console.log(err);
			privacyMD = 'Error';
			return;
		}
		privacyMD = data.toString().replace(/\{\{botName\}\}/g, client.user.username).replace(/\{\{email\}\}/g, client.config.dashboard.legalTemplates.contactEmail);
		if (client.config.dashboard.secure !== 'true') {
			privacyMD = privacyMD.replace('Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.', '');
		}
	});

	var termsMD = '';
	fs.readFile(`${process.cwd()}${path.sep}dashboard${path.sep}public${path.sep}TERMS.md`, function(err, data) {
		if (err) {
			console.log(err);
			privacyMD = 'Error';
			return;
		}
		termsMD = data.toString().replace(/\{\{botName\}\}/g, client.user.username).replace(/\{\{email\}\}/g, client.config.dashboard.legalTemplates.contactEmail);
	});

 // Página de índice. Se o usuário for autenticado, ele mostrará suas informações
 // no canto superior direito da tela.

app.get('/', (req, res) => {
    //dbl.getBot(client.user.id).then(bot => {
     res.render(path.resolve(`${templateDir}${path.sep}index.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
       stats: {
		   members: client.users.size,
       guilds: client.guilds.size,
			 uptime:  moment.duration(client.uptime).format(' D[d], H[h], m[m], s[s]'),
		   commands: client.commandsNumber,
       channels: client.channels.size
		 	},
      dbl: client,
     });
   //});
	});



app.get('/user/:userID', (req, res) => {

const usuário = client.users.get(req.params.userID)
const moment = require('moment')
let badge;
db.fetch(`userBackground_${usuário.id}`).then(back => {
 db.fetch(`userItems_${usuário.id}_background1`).then(bg => {
  db.fetch(`userBalance2.0_${usuário.id}`).then(cB => {
   const coins = cF.format(cB, { code: 'BRL' });
    db.fetch(`userRep1_${usuário.id}`).then(r => {
     db.fetch(`userItems_${usuário.id}_premium1`).then(p => {
      db.fetch(`userItems_${usuário.id}_badge1`).then(b => {
       db.fetch(`userDesc_${usuário.id}`).then(desc => {
        if (req.isAuthenticated()) {
            res.render(path.resolve(`${templateDir}${path.sep}user.ejs`), {
            bot: client,
            auth: true,
            user: req.user,
            usuário: usuário,
            moment: moment,
            badge: b,
            premium: p,
            reps: r,
            cB: coins,
            bg: bg,
            back: back,
            desc: desc
           });
        } else {
         res.render(path.resolve(`${templateDir}${path.sep}user.ejs`), {
           bot: client,
           auth: false,
           user: null,
           usuário: usuário,
           moment: moment,
           badge: b,
           premium: p,
           reps: r,
           cB: coins,
           bg: bg,
           back: back,
           desc: desc
          });
        };
       });
      });
     });
    });
   });
  });
 });
  
});

app.get('/user' && '/user/', (req, res) => {
  res.redirect('/')
});


  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

 app.get("/autherror", (req, res) => {
    res.render(path.resolve(`${templateDir}${path.sep}autherror.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
    });
  });

	app.get('/legal', function (req, res) {
    var showdown	= require('showdown');
		var	converter = new showdown.Converter(),
			textPr			= privacyMD,
			htmlPr			= converter.makeHtml(textPr),
			textTe			= termsMD,
			htmlTe			= converter.makeHtml(textTe);
		res.render(path.resolve(`${templateDir}${path.sep}legal.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
			privacy: htmlPr.replace(/\\'/g, `'`),
			terms: htmlTe.replace(/\\'/g, `'`),
			edited: client.config.dashboard.legalTemplates.lastEdited
		})
  });

  app.get('/guilds', (req, res) => {
		res.render(path.resolve(`${templateDir}${path.sep}guilds.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
		 });
	});

   app.get('/users', (req, res) => {
		res.render(path.resolve(`${templateDir}${path.sep}users.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
		 });
	});

  app.get('/guild/:guildID', (req, res) => {
   const guild = client.guilds.get(req.params.guildID);
    res.render(path.resolve(`${templateDir}${path.sep}guild.ejs`), {
      bot: client,
      auth: req.isAuthenticated() ? true : false,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      moment: moment,
      serverList:guild.options.serverList,
      invite: guild.options.invite,
      createdAt: moment.utc(client.guilds.get(req.params.guildID).createdAt).format('LLLL').replace('January', 'Janeiro').replace('February', 'Fevereiro').replace('March', 'Março').replace('April', 'Abril').replace('May', 'Maio').replace('June', 'Junho').replace('July', 'Julho').replace('August', 'Agosto').replace('September', 'Setembro').replace('October', 'Outubro').replace('November', 'Novembro').replace('December', 'Dezembro').replace('Sunday', 'Domingo').replace('Monday', 'Segunda-Feira').replace('Tuesday', 'Terça-Feira').replace('Wednesday', 'Quarta-Feira').replace('Thursday', 'Quinta-Feira').replace('Friday', 'Sexta-Feira').replace('Saturday', 'Sábado')
     });
  });

  app.get('/support', (req, res) => {
   client.channels.get('629744555708645435').createInvite().then(invite => {
    res.redirect(invite.url)
   });
  });

	app.get('/login/Discord', (req, res, next) => {
		if (req.session.backURL) {
			req.session.backURL = req.session.backURL;
		} else if (req.headers.referer) {
			const parsed = url.parse(req.headers.referer);
			if (parsed.hostname === app.locals.domain) {
				req.session.backURL = parsed.path;
			}
		} else {
			req.session.backURL = '/me';
		}
		next();
	},
	passport.authenticate('discord'));

  app.get('/login', (req, res) => {
   res.render(path.resolve(`${templateDir}${path.sep}login.ejs`), {
	  bot: client,
    auth: req.isAuthenticated() ? true : false,
    user: req.isAuthenticated() ? req.user : null,
	 });
  });

  app.get('/login/default', (req, res) => {
   res.render(path.resolve(`${templateDir}${path.sep}loginDefault.ejs`), {
	  bot: client,
    auth: req.isAuthenticated() ? true : false,
    user: req.isAuthenticated() ? req.user : null,
	 });
  });

  app.post('/login/default', (req, res) => {

  });

  
	app.get('/callback', passport.authenticate('discord', {
		failureRedirect: '/autherror'
	}), (req, res) => {
		if (req.session.backURL) {
			res.redirect(req.session.backURL);
			req.session.backURL = null;
		} else {
			res.redirect('/');
		}
	});

	app.get('/admin', checkAdmin, (req, res) => {
		res.render(path.resolve(`${templateDir}${path.sep}admin.ejs`), {
			bot: client,
			user: req.user,
			auth: true
		});
	});

		app.get('/me', checkAuth, (req, res) => {
		const perms = Discord.EvaluatedPermissions;
    const user = req.user;
    
		res.render(path.resolve(`${templateDir}${path.sep}dashboard.ejs`), {
			perms: perms,
			bot: client,
			user: user,
			auth: true,
      moment: moment
    });
	});

	app.get('/add/:guildID', checkAuth, (req, res) => {
		req.session.backURL = '/me';
		var invitePerm = client.config.dashboard.invitePerm;
		var inviteURL = `https://discordapp.com/oauth2/authorize?client_id=${client.appInfo.id}&scope=bot&guild_id=${req.params.guildID}&response_type=code&redirect_uri=${encodeURIComponent(`${client.callbackURL}`)}&permissions=${invitePerm}`;
		if (client.guilds.has(req.params.guildID)) {
			res.send('<p>Dark já está neste servidor <script>setTimeout(function () { window.location="/me"; }, 1000);</script><noscript><meta http-equiv="refresh" content="1; url=/dashboard" /></noscript>');
		} else {
			res.redirect(inviteURL);
		}
	});

	app.post('/manage/:guildID', checkAuth, (req, res) => {
		const guild = client.guilds.get(req.params.guildID);
		if (!guild) return res.status(404);
		const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
		if (req.user.id === client.config.ownerID) {} else if (!isManaged) {
			res.redirect('/');
		}
   const guildSettings = {
      welcomeChannel: req.body.welcomeChannel,
      byeChannel: req.body.byeChannel,
      welcomeMessage: req.body.welcomeMessage,
      byeMessage: req.body.byeMessage,
      welcomeAutoRole: req.body.welcomeAutoRole,
      invite: req.body.invite,
   };

   client.guilds.get(guild.id).options = guildSettings;

   db.set(`guildSettings_${guild.id}_welcomeChannel`, req.body.welcomeChannel);
   db.set(`guildSettings_${guild.id}_byeChannel`, req.body.byeChannel);
   db.set(`guildSettings_${guild.id}_welcomeMessage`, req.body.welcomeMessage);
   db.set(`guildSettings_${guild.id}_byeMessage`, req.body.byeMessage);
   db.set(`guildSettings_${guild.id}_welcomeAutoRole`, req.body.welcomeAutoRole);
   db.set(`guildSettings_${guild.id}_invite`, req.body.invite);

		res.redirect(`/manage/${req.params.guildID}`);
	});

	app.get('/manage/:guildID', checkAuth, (req, res) => {
		const guild = client.guilds.get(req.params.guildID);
		if (!guild) return res.status(404);
    
		const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('MANAGE_GUILD') : false;
		if (req.user.id === client.config.ownerID) {
			console.log(``);
		} else if (!isManaged) {
			res.redirect('/me');
		};
		res.render(path.resolve(`${templateDir}${path.sep}manage.ejs`), {
			bot: client,
			guild: guild,
			user: req.user,
			auth: true,
      packs: {
       moment: moment,
       db: db
      },
		});
	});


	app.get('/commands', (req, res) => {
		if (req.isAuthenticated()) {
			res.render(path.resolve(`${templateDir}${path.sep}commands.ejs`), {
				bot: client,
				auth: true,
				user: req.user,
				md: md
			});
		} else {
			res.render(path.resolve(`${templateDir}${path.sep}commands.ejs`), {
				bot: client,
				auth: false,
				user: null,
				md: md
			});
		}
	});

  app.get('/i/:guildID', (req, res) => {
    let guild = client.guilds.get(req.params.guildID);
    guild.fetchInvites().then(invites => {
     var ryoujiInvite = invites.filter(inv => inv.inviter.id == client.user.id)
     if(ryoujiInvite.size < 1) guild.channels.random().createInvite().then(a => res.redirect(a.toString()))
     else res.redirect(ryoujiInvite.first().toString())
    })
  });

	app.get('/legal', function (req, res) {

		md.setOptions({
			renderer: new md.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false
		});

		res.render(path.resolve(`${templateDir}${path.sep}legal.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
			privacy: md(privacyMD),
			terms: md(termsMD),
			edited: client.config.dashboard.legalTemplates.lastEdited
		});
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

  app.get('/contributors', (req, res) => {
    res.render(path.resolve(`${templateDir}${path.sep}contributors.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
    });
  });
  
  app.get('/add', (req, res) => {
   res.redirect('https://discordapp.com/oauth2/authorize?client_id=588520411025637387&scope=bot&permissions=2113404159');
  });
 
  app.get('/edit', checkAuth, (req, res) => {
    res.render(path.resolve(`${templateDir}${path.sep}userEdit.ejs`), {
   		bot: client,
			user: req.user,
			auth: true,
    });
  });

  app.get('/generateToken', checkAuth, (req, res ) => {
   function generateToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

    for (var i = 0; i < 10; i++)
     text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
   }
  
    var token = generateToken()
    client.db.set(`userToken_${req.user.id}`, token);
    client.users.get(req.user.id).options.token = token;
    
   res.redirect('/edit');
  });

  app.post('/edit', checkAuth, (req, res) => {
   const userSettings = {
    description: req.body.description
   };
  
   db.set(`userDesc_${req.user.id}`, req.body.description);
    
   client.users.get(req.user.id).options = userSettings;

   res.redirect('/edit')
  });

  app.get('/watch/:videoID', (req, res) => {
     res.render(path.resolve(`${templateDir}${path.sep}video.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
      videoID: req.params.videoID
   });
  });

  app.get('/clip/:clipID', (req, res) => {
     res.render(path.resolve(`${templateDir}${path.sep}clip.ejs`), {
			bot: client,
			auth: req.isAuthenticated() ? true : false,
			user: req.isAuthenticated() ? req.user : null,
      clipID: req.params.clipID
   });
  });

	app.get('*', function(req, res) { // Catch-all 404
		res.send('		<link href="/public/theme-dark.css" rel="stylesheet" id="theme"> <h1 style="font-family: "Pacifico", cursive; text-transform: none;"> 404 Página não encontrada...</h1> <script>setTimeout(function () { window.location = "/"; }, 1000);</script><noscript><meta http-equiv="refresh" content="1; url=/" /></noscript>');
	});

	client.site = app.listen(client.config.dashboard.port, function() {
		client.log('log', `Painel em execução na porta ${client.config.dashboard.port}`, 'INFO');
	}).on('error', (err) => {
		client.log('ERROR', `Erro ao iniciar o painel: ${err.code}`);
		return process.exit(0);
	});
};
