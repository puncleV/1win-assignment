import casual from 'casual';
import { RabbitAdapter } from './queue-adapters';
import { config } from '../config';

const GROUPS = new Array(50).fill().map((g, i) => i);
const MATCHES = new Array(50).fill().map((g, i) => i);
const getOdds = () => casual.array_of_doubles(2);
const getMatches = () => {
  const randomFactor = casual.integer(0, 5);
  return MATCHES.filter(m => m % randomFactor === 0);
};
const getGroups = () => {
  const randomFactor = casual.integer(8, 10);
  return GROUPS.filter(m => m % randomFactor === 0);
};
const generateOddsMessage = () => getMatches().reduce((a, matchId) => a.concat(getGroups().map(group => ({
  group,
  matchId,
  odds: getOdds(),
}))), []);
const generateDisableMessages = () => getGroups().map(g => ({ group: g, reason: casual.word }));

const main = async () => {
  const rabbitAdapter = await RabbitAdapter.create(config.rabbit);

  setInterval(async () => {
    // eslint-disable-next-line no-console
    await rabbitAdapter.send({
      type: 'odds',
      data: generateOddsMessage(),
    });
  }, 500);

  setInterval(async () => {
    // eslint-disable-next-line no-console
    await rabbitAdapter.send({
      type: 'disable_odds',
      data: generateDisableMessages(),
    });
  }, 5000);
};

main();
