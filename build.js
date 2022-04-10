const clearDir = async(dir) => {
  await $`rm -rf ${dir}`
}

const makeDirs = async(dirs) => {
  for(const dir of dirs) {
    await $`mkdir ${dir}`
  }
}

const compileSASS = async(dir, outDir, filename) => {
  await $`sass ${dir + '/' + filename} ${outDir + '/' + filename.replace('sass', 'css')}`
}

const compileHAML = async(filePath, outPath) => {
  await $`haml ${filePath} ${outPath}`
}

const compileHAMLDir = async(dir, outDir) => {
  const files = await fs.readdir(dir)
  for(const file of files) {
    if(file.endsWith('haml')) {
      const filePath = path.join(dir, file)
      const outPath = path.join(outDir, file.replace('haml', 'html'))

      await compileHAML(filePath, outPath)
    }
  }
}

async function main() {
  await clearDir('dist')
  await makeDirs(['dist', 'dist/styles'])
  await compileHAMLDir('src/templates', 'src/templates')
  await compileHAMLDir('src', 'dist')
  await compileSASS('src/styles', 'dist/styles', 'login.sass')
}

main()
