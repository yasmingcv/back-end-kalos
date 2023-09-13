/*****************************************************************************************
 * Objetivo: Arquivo responsável pela configuração do passport para autenticação com Google
 * Data: 13/09/2023
 * Autores: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

const passport = require('passport')
const GoogleStrategy =  require('passport-google-oauth2').Strategy

// passport.use(new GoogleStrategy({
//     clientID:,
//     clientSecret:,
//     callbackURL:,
// }))