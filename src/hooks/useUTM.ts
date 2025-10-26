import { useEffect, useState } from 'react';

interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export function useUTM(): UTMParams {
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  useEffect(() => {
    // Try localStorage first
    const stored = localStorage.getItem('utm_params');
    if (stored) {
      try {
        setUtmParams(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse UTM params');
      }
    }

    // Parse from URL
    const urlParams = new URLSearchParams(window.location.search);
    const params: UTMParams = {};
    
    const source = urlParams.get('utm_source');
    const medium = urlParams.get('utm_medium');
    const campaign = urlParams.get('utm_campaign');
    const content = urlParams.get('utm_content');
    const term = urlParams.get('utm_term');
    
    if (source) params.source = source;
    if (medium) params.medium = medium;
    if (campaign) params.campaign = campaign;
    if (content) params.content = content;
    if (term) params.term = term;
    
    // Store if found
    if (Object.keys(params).length > 0) {
      localStorage.setItem('utm_params', JSON.stringify(params));
      setUtmParams(params);
    }
  }, []);

  return utmParams;
}