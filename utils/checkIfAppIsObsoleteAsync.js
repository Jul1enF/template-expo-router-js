import * as Application from 'expo-application'
import request from 'utils/request'

const url = process.env.EXPO_PUBLIC_BACK_ADDRESS

const isRunningVersionObsolete = (runningVersion, minimumVersion) => {
    let obsoleteBuild = false
    const runningVersionNumbers = runningVersion.split('.').map(e => Number(e))
    const minimumVersionNumbers = minimumVersion.split('.').map(e => Number(e))

    if (minimumVersionNumbers[0] > runningVersionNumbers[0]) {
        obsoleteBuild = true
    }
    else if (minimumVersionNumbers[0] == runningVersionNumbers[0]) {
        if (minimumVersionNumbers[1] > runningVersionNumbers[1]) {
            obsoleteBuild = true
        } else if (minimumVersionNumbers[1] == runningVersionNumbers[1]) {
            if (minimumVersionNumbers[2] > runningVersionNumbers[2]) {
                obsoleteBuild = true
            }
        }
    }
    return obsoleteBuild
}


const checkIfAppIsObsoleteAsync = async () => {
    const data = await request({ path: '/users/getAppMinimumVersion' })

    if (!data) {
        return false
    }

    const appRunningVersion = Application.nativeApplicationVersion
    const { appMinimumVersion } = data

    return isRunningVersionObsolete(appRunningVersion, appMinimumVersion)
}

module.exports = { checkIfAppIsObsoleteAsync }