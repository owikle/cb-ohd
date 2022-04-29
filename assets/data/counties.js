---
# front matter
---
{%- assign items = site.data[site.metadata] | where_exp: 'item','item.county != nil' -%}
{%- assign counties = site.data.idahocounties -%}

var countyData = {"type":"FeatureCollection","features":[
    {%for county in counties%}{%- assign countyitems = items | where_exp: 'item','item.county contains county.name' -%}{% unless countyitems.size < 1 %}
    {"type":"Feature","id":"{{county.id}}",
    "properties":{"name":"{{county.name}}", 
    "collections":"{% for item in countyitems%}<a href='{{ item.objectid | prepend: '/items/' | relative_url}}.html'>{{item.title }}</a><br>{% if forloop.last %}","number":{{countyitems.size| jsonify }}{% endif %}{% endfor %} },"geometry":{"type":"Polygon","coordinates":[[{{county.coordinates}}]]}}{% unless forloop.last%},{% endunless%}
    {% endunless%}{% endfor %} 
    ]}