import youtube from 'youtube-finder';
import secrets from '../../secrets.environment';
import ContainerBuilder from './container-builder';
import routeParams from './query';
import '../css/content.css';

const builder = new ContainerBuilder();
builder.createVideoContainer();

const client = youtube.createClient({ key: secrets.API_KEY });
client.search(routeParams, (err, data) => {
  const firstResult = data.items[0];
  if (!firstResult) {
    builder.deleteVideoContainer();
    return;
  }

  const { videoId } = firstResult.id;
  builder.createVideoIframe(videoId);
});
