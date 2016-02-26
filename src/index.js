var PieMeter = require('./PieMeter.js')();

if(typeof window === 'undefined')
{
  throw "This component is for client side javascript";
}
window.PieMeter = PieMeter;
