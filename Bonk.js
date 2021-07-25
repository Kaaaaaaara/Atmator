module.exports = {
      name: 'test',
      description: "this is a test command!",
      execute(message, args){
          message.channel.send('bonk!');
      }

}