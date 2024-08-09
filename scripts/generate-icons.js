import fs from "fs";
import path from "path";
import { glob } from "glob";
import SVGSpriter from "svg-sprite";
import mkdirp from "mkdirp";

const ICONS_PATH = path.resolve(process.cwd(), "src/shared/icons");
const OUTPUT_DIR = path.resolve(process.cwd(), "src/shared/ui/icon");

console.log("Идет генерация иконок");

generate().then(() => {
  console.log(`Иконки сгенерированы в ${OUTPUT_DIR}`);
});

async function generate() {
  const iconNames = await generateSvgSprite({
    iconsPath: ICONS_PATH,
    outputDir: OUTPUT_DIR,
    fileName: "icon.sprite",
  });

  generateIconNames({
    iconNames,
    fileName: "icon.names",
    outputDir: OUTPUT_DIR,
  });
}

function generateSvgSprite({ iconsPath, outputDir, fileName }) {
  const spriteFiles = glob.sync(`${iconsPath}/**/*.svg`);

  const spriter = new SVGSpriter({
    dest: outputDir,
    shape: {
      dimension: {
        maxWidth: 200,
        maxHeight: 200,
        attributes: false,
      },
      transform: [
        {
          svgo: {
            plugins: [
              {
                convertColors: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      ],
    },
    mode: {
      inline: true,
      symbol: {
        example: false,
        dest: "",
        sprite: `${fileName}.svg`,
      },
    },
    svg: {
      namespaceClassnames: false,
    },
  });

  const svgs = [];

  spriteFiles.forEach((file) => {
    const filePath = path.resolve(file);
    spriter.add(
      filePath,
      null,
      fs.readFileSync(filePath, {
        encoding: "utf-8",
      })
    );

    svgs.push(path.basename(file, ".svg"));
  });

  return new Promise((resolve, reject) => {
    spriter.compile((error, result) => {
      if (error) {
        return reject(error);
      }

      try {
        Object.values(result).forEach((mode) => {
          Object.values(mode).forEach((resource) => {
            mkdirp.sync(path.dirname(resource.path));
            fs.writeFileSync(resource.path, resource.contents);
          });
        });
      } catch (e) {
        return reject(e);
      }

      return resolve(svgs);
    });
  });
}

function generateIconNames({ iconNames, fileName, outputDir }) {
  const content =
    "export const names = " + JSON.stringify(iconNames, null, 2) + " as const";

  fs.writeFileSync(path.join(outputDir, fileName + ".ts"), content, "utf8");
}
