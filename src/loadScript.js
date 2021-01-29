export const loadScript = (url) =>
  new Promise((resolve, reject) => {
    let ready = false;
    if (!document) {
      reject(new Error('Document was not defined'));
    }

    const tag = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');

    script.crossOrigin = '';
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = () => {
      if (!ready) {
        ready = true;
        resolve(script);
      }
    };
    script.onload = script.onreadystatechange;

    script.onerror = (msg) => {
      reject(new Error('Error loading script.'));
    };

    script.onabort = (msg) => {
      reject(new Error('Script loading aborted.'));
    };

    if (tag.parentNode != null) {
      //tag.parentNode.insertBefore(script, tag);
      tag.parentNode.insertBefore(script, tag);
    }
  });
