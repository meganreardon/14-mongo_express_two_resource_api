'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Show = require('../model/show.js');
const Episode = require('../model/episode.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleEpisode = {
  title: 'example episode title',
  director: 'example episode director'
};

const exampleShow = {
  name: 'example show name',
  startDate: new Date('December 16, 2016 012:00:00')
  // startDate: 'December 16, 2016 012:00:00'
};

describe('Episode Routes', function() {

  // ----------
  // POST tests
  // ----------

  describe('POST: /api/show/:showID/episode', function() {
    describe('with a valid show and episode body', () => {

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

  // ---------
  // GET tests
  // ---------

  describe('GET: /api/show/:showID/episode', function() {
    describe('with a valid show and episode body', () => {

      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddEpisode(show._id, exampleEpisode);
        })
        .then( episode => {
          this.tempEpisode = episode;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempShow) {
          Show.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return an episode', done => {
        request.get(`${url}/api/show/${this.tempShow.id}/episode`)
        .send(exampleEpisode)
        .end((err, res) => {
          if (err) return done(err);
          // NOTE: keep logs below for question to TA
          // console.log('\n\n');
          // console.log('::: res.body is: ', res.body);
          // console.log('::: res.body.episodes', res.body.episodes);
          // console.log('::: res.body.episodes[0]', res.body.episodes[0]);
          // console.log('\n\n');
          expect(res.body.name).to.equal(exampleShow.name);
          // NOTE: keep logs below for question to TA
          // console.log('::: res.body is:', res.body);
          // console.log('::: res.body.showID is:', res.body.showID);
          // console.log('::: res.body._id is:', res.body._id);
          // console.log('::: this.tempShow._id is:', this.tempShow._id);
          // expect(res.body.showID).to.equal(this.tempShow._id.toString()); // orig from demo
          expect(res.body._id).to.equal(this.tempShow._id.toString());
          // console.log('\n\n');
          // console.log('::: this.tempEpisode is:', this.tempEpisode, '\n\n');
          // console.log('::: this.tempEpisode._id is:', this.tempEpisode._id);
          // console.log('::: exampleEpisode._id is:', exampleEpisode._id);
          // console.log('::: exampleEpisode is:', exampleEpisode);
          // console.log('\n\n');
          // console.log('\n\n');
          // console.log('::: res.body.episodes[0] is:', res.body.episodes[0]);
          // console.log('::: this.tempEpisode._id is:', this.tempEpisode._id);
          // console.log('\n\n');
          expect(res.body.episodes[0]).to.equal(this.tempEpisode._id.toString());
          done();
        });
      });

    });
  });

});
