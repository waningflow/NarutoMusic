const { session } = require('electron');

async function init(mainWindow: any) {
  try {
    const cookie = await session.defaultSession.cookies.get({});
    mainWindow.webContents.send('cookieChanged', cookie);

    session.defaultSession.cookies.addListener('changed', (_: any, c: any) => {
      mainWindow.webContents.send('cookieChanged', c);
    });
  } catch (e) {
    //
  }
}

export default init;
