CREATE TABLE `castles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` integer
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`castle_id` integer,
	`path` text NOT NULL,
	FOREIGN KEY (`castle_id`) REFERENCES `castles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parametry` (
	`id` integer PRIMARY KEY NOT NULL,
	`x` real,
	`y` real,
	`z` real NOT NULL,
	`special` text,
	FOREIGN KEY (`id`) REFERENCES `castles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `popis` (
	`id` integer PRIMARY KEY NOT NULL,
	`hlavni` text NOT NULL,
	`druh` text NOT NULL,
	`material` text NOT NULL,
	`vybaveni` text NOT NULL,
	`kapacita` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `castles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `popis_pronajem` (
	`id` integer PRIMARY KEY NOT NULL,
	`skladem` text,
	`cena` integer NOT NULL,
	`cena_hodina` integer NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `castles`(`id`) ON UPDATE no action ON DELETE no action
);
