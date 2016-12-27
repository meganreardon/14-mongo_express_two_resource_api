'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Show = require('../model/show.js');
// const Episode = require('../model/episode.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleShow = {
  name: 'example show',
  startDate: new Date('December 16, 2016 012:00:00')
};

const exampleEpisode = {
  title: 'example title',
  director: 'example director'
};

describe('Show Routes', function() {

  // ----------
  // POST tests
  //-----------

  describe('POST: /api/show', function() {
    describe('with a valid body', function() {

      after(done => {
        if(this.tempShow) {
          Show.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a show', done => {
        request.post(`${url}/api/show`)
        .send(exampleShow)
        .end((err, res) => {
          if (err) return done(err);
          expect (res.status).to.equal(200);
          expect (res.body.name).to.equal('test show');
          this.tempShow = res.body;
          done();
        });
      });

    });
  });

  // ---------
  // GET tests
  // ---------

  describe('GET: /api/show/:id', function() {
    describe('with a valid body', function() {

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

      it('should return a show', done => {
        request.get(`${url}/api/list/${this.tempShow._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test show');
          expect(res.body.episodes.length).to.equal(1);
          expect(res.body.notes[0].name).to.equal(exampleEpisode.name);
          done();
        });
      });

    });
  });

  // ---------
  // PUT tests
  // ---------

  describe('PUT: /api/list/:id', function() {
    describe('with a valid body', function() {

      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempShow) {
          Show.remove({})
          .then ( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        var updated = { title: 'updated title'};
        request.put(`${url}/api/list/${this.tempShow._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done(err);
          let startDate = new Date(res.body.startDate);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(updated.title);
          expect(startDate.toString()).to.equal(exampleShow.startDate.toString());
          done();
        });
      });

    });
  });

});
