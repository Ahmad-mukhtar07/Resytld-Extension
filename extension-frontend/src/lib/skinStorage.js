/**
 * Chrome storage helpers for ReStyld skins (chrome.storage.sync).
 * Schema: restyld_skins = { [host]: { activeSkinId, skins: { [id]: { name, createdAt, modifications } } } }
 */

const STORAGE_KEY = 'restyld_skins';

export function getHostFromUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    return u.host || u.hostname || '';
  } catch {
    return '';
  }
}

export async function getSkinsData() {
  try {
    const out = await chrome.storage.sync.get(STORAGE_KEY);
    return out[STORAGE_KEY] || {};
  } catch (e) {
    console.error('[ReStyld] getSkinsData:', e);
    return {};
  }
}

export async function getSkinsForHost(host) {
  const data = await getSkinsData();
  const hostData = data[host] || { activeSkinId: null, skins: {} };
  return {
    skins: hostData.skins || {},
    activeSkinId: hostData.activeSkinId ?? null,
  };
}

export async function setSkinsData(data) {
  try {
    await chrome.storage.sync.set({ [STORAGE_KEY]: data });
  } catch (e) {
    console.error('[ReStyld] setSkinsData:', e);
    throw e;
  }
}

function generateSkinId() {
  return 'skin_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
}

export async function saveSkin(host, name, modifications, existingId = null) {
  const data = await getSkinsData();
  const hostData = data[host] || { activeSkinId: null, skins: {} };
  const skins = hostData.skins || {};
  const id = existingId || generateSkinId();
  const createdAt = existingId && skins[existingId] ? skins[existingId].createdAt : Date.now();
  skins[id] = { name: String(name).trim() || 'Unnamed', createdAt, modifications: modifications || [] };
  hostData.skins = skins;
  data[host] = hostData;
  await setSkinsData(data);
  return { id, name: skins[id].name, createdAt };
}

export async function deleteSkin(host, skinId) {
  const data = await getSkinsData();
  const hostData = data[host];
  if (!hostData || !hostData.skins) return;
  delete hostData.skins[skinId];
  if (hostData.activeSkinId === skinId) hostData.activeSkinId = null;
  data[host] = hostData;
  await setSkinsData(data);
}

export async function setActiveSkin(host, skinId) {
  const data = await getSkinsData();
  const hostData = data[host] || { activeSkinId: null, skins: {} };
  hostData.activeSkinId = skinId;
  data[host] = hostData;
  await setSkinsData(data);
}

export async function getActiveSkin(host) {
  const { skins, activeSkinId } = await getSkinsForHost(host);
  if (!activeSkinId || !skins[activeSkinId]) return null;
  return { id: activeSkinId, ...skins[activeSkinId] };
}
