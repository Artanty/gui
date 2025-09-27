import { ElementsMap } from "./custom-elements-map.constant"

export async function getCustomElement(elementName: string): Promise<string> {
	return new Promise(async (resolve, reject) => {
      
		try {
			if (ElementsMap[elementName as keyof typeof ElementsMap]) {
				const customElementName = ElementsMap[elementName as keyof typeof ElementsMap]
          
				const remoteName = getRemoteNameFromCustomElementName(customElementName)
				if (!isRemoteLoaded(remoteName)) throw new Error('remote ' + remoteName + ' is not loaded');

				const isRegistered = customElements.get(customElementName)
				if (!isRegistered) throw new Error(`${customElementName} is not registered`);

				resolve(customElementName)
			} else {
				throw new Error(`unknown element: ${elementName}`);
			}
		} catch (e) {
			reject(e)
		}
	})
}

export const isRemoteLoaded = (remoteName: string) => {
	// console.log(window)
	const container = (window as any)[remoteName];
	return !!container;
}

export const getRemoteNameFromCustomElementName = (customElementName: string): string => {
	return customElementName.split('-')[0]
}