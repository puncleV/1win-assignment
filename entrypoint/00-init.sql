CREATE TABLE IF NOT EXISTS whitelist
(
    `groupId`     INT NOT NULL,
    `version`     INT NOT NULL DEFAULT 0,
    `enabled`     BOOLEAN DEFAULT FALSE,
    `reason`      VARCHAR(50) DEFAULT '',
    PRIMARY KEY (`groupId`)
);
