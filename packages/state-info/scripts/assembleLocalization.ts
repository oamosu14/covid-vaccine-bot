import * as fs from 'fs'
import * as path from 'path'
import stringify = require('csv-stringify')
import { readCsvFile } from './readCsvFile'

function assembleLocalizationFile() {
	const records: unknown[] = []
	console.log('reading base file')
  const base = path.join(__dirname, '../data/custom-strings.csv')
  const outputFile =  path.join(__dirname, '../dist/localization.csv')
  
	readCsvFile(base, records)

	const stateDataDir = path.join(__dirname, '../data/states')
	const localizationFiles = fs
		.readdirSync(stateDataDir)
		.filter((f) => f.endsWith('.csv'))
	localizationFiles.forEach((file) => {
		console.log('reading ' + file)
		readCsvFile(path.join(stateDataDir, file), records)
	})

	stringify(records, { header: true }, (err, content) => {
		if (err) {
			throw err
		}

    console.log("generated localization table")
		fs.writeFile(outputFile, content, (err) => {
      if (err) {
        throw err
      }
      console.log("wrote localization table")
    })
	})
}

assembleLocalizationFile()