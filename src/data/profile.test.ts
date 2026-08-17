import { describe, expect, it } from 'vitest';
import {
  backgroundItems,
  learningItems,
  profileStations,
  skillGroups,
  targetProfile,
} from './profile';
import { projects } from './projects';

describe('profile content', () => {
  it('defines the four homepage stations in route order', () => {
    expect(profileStations.map(({ id }) => id)).toEqual([
      'skills',
      'background',
      'learnings',
      'target',
    ]);
    expect(profileStations.map(({ route }) => route)).toEqual([
      'cobalt',
      'green',
      'orange',
      'black',
    ]);
  });

  it('contains the approved profile sections without project showcase copy', () => {
    expect(skillGroups.map(({ title }) => title)).toEqual([
      'Backend',
      'Frontend',
      'Testing & quality',
      'Deployment & tools',
      'Data & ML',
    ]);
    expect(backgroundItems).toHaveLength(2);
    expect(learningItems).toHaveLength(3);
    expect(targetProfile.heading).toMatch(/graduate|junior/i);

    const serialized = JSON.stringify({
      profileStations,
      skillGroups,
      backgroundItems,
      learningItems,
      targetProfile,
    });
    for (const { title: projectTitle } of projects) {
      expect(serialized).not.toContain(projectTitle);
    }
  });
});
