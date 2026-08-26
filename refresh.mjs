// Updates the embedded snapshot's root-cast likes from the freshly fetched public thread data.
// The full quote tree requires an authenticated quotes API, so it ships as a static snapshot;
// the root cast stats (public endpoint) are refreshed daily by this script + GitHub Action.
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
const html = readFileSync('index.html', 'utf8');
let thread = null;
try { thread = JSON.parse(readFileSync('thread.json', 'utf8')); } catch {}
if (!thread || !thread.result || !thread.result.casts) {
  console.log('no thread data, skipping');
  process.exit(0);
}
const ROOT = '0x3db990553cbe9e8e8993504624b5c2aaf483aa73';
const rc = thread.result.casts.find(c => c.hash === ROOT);
if (!rc) { console.log('root not found'); process.exit(0); }
const likes = (rc.reactions && rc.reactions.count) || 0;
const replies = (rc.replies && rc.replies.count) || 0;
const m = html.match(/const DATA = (\{.*?\});\n/s);
if (!m) { console.log('DATA block not found'); process.exit(0); }
const data = JSON.parse(m[1]);
const root = data.nodes.find(n => n.h === ROOT);
if (root) root.likes = likes;
data.refreshedAt = new Date().toISOString();
const updated = html.replace(m[0], 'const DATA = ' + JSON.stringify(data) + ';\n');
writeFileSync('index.html', updated);
try { unlinkSync('thread.json'); } catch {}
console.log('refreshed: likes=' + likes + ' replies=' + replies);
