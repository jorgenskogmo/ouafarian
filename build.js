import {readFileSync, writeFileSync} from 'fs';
import {globby} from 'globby';
import mkdirp from 'mkdirp';
import copy from 'recursive-copy';
import del from 'del';
import { basename, resolve } from 'path';

const dest = 'dist'

const header = readFileSync('src/tpl/header.tpl.html').toString()
const footer = readFileSync('src/tpl/footer.tpl.html').toString()
const pagetop = readFileSync('src/tpl/pagetop.tpl.html').toString()
const pagebtm = readFileSync('src/tpl/pagebottom.tpl.html').toString()

const outdir = resolve('./', dest)

del.sync(outdir);
mkdirp(outdir)


copy('./src/images', resolve(outdir, 'images'))
copy('./src/ouafa', resolve(outdir, 'ouafa'))
copy('./src/styles.css', resolve(outdir, 'styles.css'))
copy('./src/index.html', resolve(outdir, 'index.html'))
copy('./src/touch.html', resolve(outdir, 'touch.html'))

const main = async () => {
    const pages = await globby('./src/pages/*.tpl.html')
    const count = pages.length;
    pages.forEach( (page, i) => {
        let str = header;
        str += pagetop;
        str += readFileSync(page).toString();
        str += pagebtm;
        str += footer;

        const name = basename(page).split('.')[0] + '.html'
        const fname = resolve(outdir, name);

        console.log( `${i+1} of ${count} : ${fname}`)

        writeFileSync( fname, str );

    })
}

main()