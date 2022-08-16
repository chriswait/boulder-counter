--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE RouteSettingEvents (
  'uid' TEXT   NOT NULL,
  'when' TEXT   NOT NULL,
  'summary' TEXT    NOT NULL,
  'description' TEXT    NOT NULL
);

CREATE UNIQUE INDEX idx_events_uid
on RouteSettingEvents ('uid');


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE RouteSettingEvents;