import {test} from 'node:test';
import assert from 'node:assert/strict';
import {filmCopy,filmCopyAt} from '../components/capa/FilmCopy.ts';

test('copy matches the actual kitchen, craft and bathroom shots in the final edit', () => {
 const samples=[[0,'opening'],[2.5,'cutting'],[8.2,'kitchen'],[13.3,'passage'],[20.8,'bathroom'],[23.2,'preparation'],[27,'fitting'],[31,'finished'],[36.42,'finished']];
 for(const [time,id] of samples) assert.equal(filmCopy[filmCopyAt(time)].id,id,`${time}s`);
});

test('replaying or changing sources restores the opening copy, while end stays on the result', () => {
 const times=[36.42,0,26.7,13,0,NaN,-1,36.42];
 assert.deepEqual(times.map(t=>filmCopy[filmCopyAt(t)].id),['finished','opening','fitting','passage','opening','opening','opening','finished']);
});
