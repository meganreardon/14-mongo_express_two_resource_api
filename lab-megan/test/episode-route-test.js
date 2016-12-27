'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Show = require('../model/show.js');
const Episode = require('../model/episode.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleEpisode = {
  title: 'example title',
  director: 'example director'
};

const exampleShow = {
  name: 'example show',
  startDate: new Date('December 16, 2016 012:00:00')
};

describe('Episode Routes', function() {

  // ----------
  // POST tests
  // ----------

  describe('POST: /api/show/:showID/episode', function() {
    describe('with a valid show and body', () => {

      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          Show.remove({}),
          Episode.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return an episode', done => {
        request.post(`${url}/api/show/${this.tempShow.id}/episode`)
        .send(exampleEpisode)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleEpisode.name);
          expect(res.body.showID).to.equal(this.tempShow._id.toString());
          done();
        });
      });

    });
  });

});
