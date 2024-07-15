import { Express } from "express";
import { readdir } from 'fs/promises';
import { join } from 'path';

/**
 * Routes are invoked here, you can define route here or group them based
 * on resources you have in partials folder, then invoke then here.
 * This file will botstrapped automagically into app instance.
 */

const init = function init(app: Express) {
    const modulesDir = join(__dirname, 'partials');

    (async () => {
        try {
            const files = await readdir(modulesDir);
            const moduleFiles = files.filter(file => file.endsWith('.ts') || file.endsWith('.js'));

            for (const file of moduleFiles) {
                const modulePath = `./partials/${file}`;
                const module = await import(modulePath);

                if (module.init) {
                    module.init(app);
                }
            }
        } catch (err) {
            console.error('Error reading modules directory:', err);
        }
    })();
};

export default {
    init
};